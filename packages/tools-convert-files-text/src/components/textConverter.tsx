import { Button, ButtonContent } from "@browserworkshop/shared"
import { IconDownload, IconFileText, IconUpload } from "@tabler/icons-react"
import {
    type ChangeEvent,
    type DragEvent,
    useEffect,
    useMemo,
    useState,
} from "react"
import { css } from "../../styled-system/css"

interface EncodingOption {
    id: string
    label: string
    decoder: string
    encoder: string
    byteMarker?: string
}

const encodingOptions: EncodingOption[] = [
    {
        id: "utf-8",
        label: "UTF-8",
        decoder: "utf-8",
        encoder: "utf-8",
    },
    {
        id: "utf-8-bom",
        label: "UTF-8 (BOM)",
        decoder: "utf-8",
        encoder: "utf-8",
        byteMarker: "\uFEFF",
    },
    {
        id: "utf-16le",
        label: "UTF-16 LE",
        decoder: "utf-16le",
        encoder: "utf-16le",
    },
    {
        id: "utf-16be",
        label: "UTF-16 BE",
        decoder: "utf-16be",
        encoder: "utf-16be",
    },
    {
        id: "latin1",
        label: "Latin-1 (ISO-8859-1)",
        decoder: "iso-8859-1",
        encoder: "iso-8859-1",
    },
    {
        id: "windows-1252",
        label: "Windows-1252",
        decoder: "windows-1252",
        encoder: "windows-1252",
    },
]

type LineEnding = "none" | "lf" | "crlf" | "cr"

const lineEndingOptions: {
    id: LineEnding
    label: string
}[] = [
    {
        id: "none",
        label: "Keep as-is",
    },
    {
        id: "lf",
        label: "LF (Unix/macOS)",
    },
    {
        id: "crlf",
        label: "CRLF (Windows)",
    },
    {
        id: "cr",
        label: "CR (classic Mac)",
    },
]

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function TextConverter() {
    const [sourceFile, setSourceFile] = useState<File | null>(null)
    const [sourceText, setSourceText] = useState<string | null>(null)
    const [sourceEncodingId, setSourceEncodingId] = useState<string>("utf-8")
    const [targetEncodingId, setTargetEncodingId] = useState<string>("utf-8")
    const [lineEnding, setLineEnding] = useState<LineEnding>("none")
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [outputUrl, setOutputUrl] = useState<string | null>(null)
    const [outputSize, setOutputSize] = useState<number | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const targetEncoding =
        encodingOptions.find((e) => e.id === targetEncodingId) ??
        encodingOptions[0]

    const [fileBaseName, setFileBaseName] = useState(
        sourceFile?.name.replace(/\.[^/.]+$/, "") ?? "converted",
    )
    const [customExtension, setCustomExtension] = useState(
        sourceFile?.name.match(/\.[^/.]+$/)?.[0]?.replace(".", "") ?? "txt",
    )

    const outputExtension =
        customExtension.trim() === ""
            ? ".txt"
            : customExtension.startsWith(".")
              ? customExtension
              : `.${customExtension}`

    function detectEncoding(bytes: Uint8Array): string {
        if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
            return "utf-16be"
        }
        if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
            return "utf-16le"
        }
        if (
            bytes.length >= 3 &&
            bytes[0] === 0xef &&
            bytes[1] === 0xbb &&
            bytes[2] === 0xbf
        ) {
            return "utf-8"
        }
        return "utf-8"
    }

    function loadFile(file: File | undefined | null) {
        if (!file) return
        setError(null)
        const reader = new FileReader()
        reader.onload = () => {
            const arrayBuffer = reader.result
            if (!(arrayBuffer instanceof ArrayBuffer)) {
                setError("Failed to read the file.")
                return
            }
            const bytes = new Uint8Array(arrayBuffer)
            const detected = detectEncoding(bytes)
            setSourceEncodingId(detected)
            setSourceFile(file)
            setOutputUrl(null)
            setOutputSize(null)
            setPreview(null)

            const detectedOption =
                encodingOptions.find((e) => e.id === detected) ??
                encodingOptions[0]

            if (detected === "utf-16be") {
                const typed = new Uint8Array(arrayBuffer)
                const swapped = new Uint8Array(typed.length)
                for (let i = 0; i + 1 < typed.length; i += 2) {
                    swapped[i] = typed[i + 1]
                    swapped[i + 1] = typed[i]
                }
                const swappedBuffer = swapped.buffer as ArrayBuffer
                decoding(swappedBuffer)
                return
            }

            decoding(arrayBuffer)

            function decoding(buffer: ArrayBuffer) {
                try {
                    const decoder = new TextDecoder(detectedOption.decoder, {
                        fatal: true,
                    })
                    const text = decoder.decode(buffer)
                    setSourceText(text)
                    setPreview(text.slice(0, 2000))
                } catch {
                    setError(
                        "Could not decode the file with the selected encoding.",
                    )
                }
            }
        }
        reader.readAsArrayBuffer(file)
    }

    const output = useMemo(() => {
        if (!sourceText || sourceText === "") {
            return null
        }
        let text = sourceText
        if (lineEnding !== "none") {
            const normalized = text.replace(/\r\n|\r|\n/g, "\n")
            if (lineEnding === "crlf") {
                text = normalized.replace(/\n/g, "\r\n")
            } else if (lineEnding === "cr") {
                text = normalized.replace(/\n/g, "\r")
            } else {
                text = normalized
            }
        }
        return {
            ...targetEncoding,
            text,
        }
    }, [
        sourceText,
        lineEnding,
        targetEncoding,
    ])

    useEffect(() => {
        if (!output) {
            setOutputUrl(null)
            setOutputSize(null)
            return
        }
        let cancelled = false
        const encoder = new TextEncoder()
        let bytes: Uint8Array
        try {
            bytes = encoder.encode(output.text)
        } catch {
            setError("Could not encode the output text.")
            return
        }

        const needsBEConversion = output.encoder === "utf-16be"
        let finalBytes = bytes

        if (output.byteMarker) {
            const marker = encoder.encode(output.byteMarker)
            const combined = new Uint8Array(marker.length + bytes.length)
            combined.set(marker, 0)
            combined.set(bytes, marker.length)
            finalBytes = combined
        }

        if (needsBEConversion && finalBytes.length % 2 === 0) {
            const swapped = new Uint8Array(finalBytes.length)
            for (let i = 0; i + 1 < finalBytes.length; i += 2) {
                swapped[i] = finalBytes[i + 1]
                swapped[i + 1] = finalBytes[i]
            }
            finalBytes = swapped
        }

        const blob = new Blob(
            [
                finalBytes as Uint8Array<ArrayBuffer>,
            ],
            {
                type: "text/plain",
            },
        )
        const url = URL.createObjectURL(blob)
        if (!cancelled) {
            setOutputUrl(url)
            setOutputSize(blob.size)
        }
        return () => {
            cancelled = true
            URL.revokeObjectURL(url)
        }
    }, [
        output,
    ])

    useEffect(() => {
        return () => {
            if (outputUrl) URL.revokeObjectURL(outputUrl)
        }
    }, [
        outputUrl,
    ])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        loadFile(event.target.files?.[0])
        event.target.value = ""
    }

    function handleDrop(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault()
        setDragActive(false)
        loadFile(event.dataTransfer.files?.[0])
    }

    function handleDragOver(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault()
        setDragActive(true)
    }

    function handleDragLeave() {
        setDragActive(false)
    }

    function download() {
        if (!outputUrl || !sourceFile || !targetEncoding) return
        const baseName = fileBaseName.trim() === "" ? "converted" : fileBaseName
        const link = document.createElement("a")
        link.href = outputUrl
        link.download = `${baseName}${outputExtension}`
        link.click()
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                gap: "1rem",
            })}
        >
            {error && (
                <div
                    className={css({
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        borderColor: "red/40",
                        backgroundColor: "red/10",
                        color: "red",
                        fontSize: "0.875rem",
                    })}
                >
                    {error}
                </div>
            )}

            <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    borderWidth: "2px",
                    borderStyle: "dashed",
                    borderColor: dragActive ? "primary" : "neutral/20",
                    backgroundColor: dragActive ? "primary/10" : "neutral/5",
                    cursor: "pointer",
                    textAlign: "center",
                    _hover: {
                        borderColor: "primary",
                    },
                })}
            >
                <span
                    className={css({
                        color: "primary",
                    })}
                >
                    <IconUpload size={28} />
                </span>
                <span
                    className={css({
                        fontSize: "0.875rem",
                        color: "neutral",
                    })}
                >
                    Drop a text file here or click to browse
                </span>
                <span
                    className={css({
                        fontSize: "0.75rem",
                        color: "neutral/50",
                    })}
                >
                    TXT · markdown · CSV · JSON · code
                </span>
                <input
                    type="file"
                    accept=".txt,.md,.csv,.json,.log,.html,.css,.js,.ts,text/plain"
                    onChange={handleInputChange}
                    className={css({
                        display: "none",
                    })}
                />
            </label>

            {sourceFile && sourceText !== null && output && (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "stretch",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "stretch",
                            gap: "0.75rem",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            borderWidth: "1px",
                            borderColor: "neutral/10",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <IconFileText size={16} />
                            <span
                                className={css({
                                    fontSize: "0.875rem",
                                    color: "neutral",
                                })}
                            >
                                {sourceFile.name}
                            </span>
                        </div>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <label
                                htmlFor="text-source-encoding"
                                className={css({
                                    fontSize: "0.75rem",
                                    color: "neutral/60",
                                })}
                            >
                                Source encoding
                            </label>
                            <select
                                id="text-source-encoding"
                                value={sourceEncodingId}
                                onChange={(event) =>
                                    setSourceEncodingId(
                                        event.currentTarget.value,
                                    )
                                }
                                className={css({
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "0.375rem",
                                    borderWidth: "1px",
                                    borderColor: "neutral/20",
                                    backgroundColor: "transparent",
                                    color: "neutral",
                                    fontSize: "0.875rem",
                                    cursor: "pointer",
                                })}
                            >
                                {encodingOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <label
                                htmlFor="text-target-encoding"
                                className={css({
                                    fontSize: "0.75rem",
                                    color: "neutral/60",
                                })}
                            >
                                Target encoding
                            </label>
                            <select
                                id="text-target-encoding"
                                value={targetEncodingId}
                                onChange={(event) =>
                                    setTargetEncodingId(
                                        event.currentTarget.value,
                                    )
                                }
                                className={css({
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "0.375rem",
                                    borderWidth: "1px",
                                    borderColor: "neutral/20",
                                    backgroundColor: "transparent",
                                    color: "neutral",
                                    fontSize: "0.875rem",
                                    cursor: "pointer",
                                })}
                            >
                                {encodingOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <label
                                htmlFor="text-line-ending"
                                className={css({
                                    fontSize: "0.75rem",
                                    color: "neutral/60",
                                })}
                            >
                                Line endings
                            </label>
                            <select
                                id="text-line-ending"
                                value={lineEnding}
                                onChange={(event) =>
                                    setLineEnding(
                                        event.currentTarget.value as LineEnding,
                                    )
                                }
                                className={css({
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "0.375rem",
                                    borderWidth: "1px",
                                    borderColor: "neutral/20",
                                    backgroundColor: "transparent",
                                    color: "neutral",
                                    fontSize: "0.875rem",
                                    cursor: "pointer",
                                })}
                            >
                                {lineEndingOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <label
                                htmlFor="text-file-name"
                                className={css({
                                    fontSize: "0.75rem",
                                    color: "neutral/60",
                                    flexShrink: 0,
                                })}
                            >
                                File name
                            </label>
                            <div
                                className={css({
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    flex: 1,
                                    justifyContent: "flex-end",
                                })}
                            >
                                <input
                                    id="text-file-name"
                                    type="text"
                                    value={fileBaseName}
                                    onChange={(event) =>
                                        setFileBaseName(
                                            event.currentTarget.value,
                                        )
                                    }
                                    className={css({
                                        padding: "0.25rem 0.5rem",
                                        borderRadius: "0.375rem",
                                        borderWidth: "1px",
                                        borderColor: "neutral/20",
                                        backgroundColor: "transparent",
                                        color: "neutral",
                                        fontSize: "0.875rem",
                                        width: "100%",
                                        maxWidth: "12rem",
                                    })}
                                />
                                <span
                                    className={css({
                                        color: "neutral/50",
                                        fontSize: "0.875rem",
                                    })}
                                >
                                    .
                                </span>
                                <input
                                    id="text-file-extension"
                                    type="text"
                                    value={customExtension}
                                    onChange={(event) =>
                                        setCustomExtension(
                                            event.currentTarget.value,
                                        )
                                    }
                                    aria-label="File extension"
                                    className={css({
                                        padding: "0.25rem 0.5rem",
                                        borderRadius: "0.375rem",
                                        borderWidth: "1px",
                                        borderColor: "neutral/20",
                                        backgroundColor: "transparent",
                                        color: "neutral",
                                        fontSize: "0.875rem",
                                        width: "4.5rem",
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    {preview && (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "stretch",
                                gap: "0.25rem",
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: "0.75rem",
                                    color: "neutral/60",
                                })}
                            >
                                Preview
                            </span>
                            <pre
                                className={css({
                                    margin: "0",
                                    padding: "0.75rem",
                                    borderRadius: "0.5rem",
                                    backgroundColor: "neutral/5",
                                    borderWidth: "1px",
                                    borderColor: "neutral/10",
                                    fontSize: "0.75rem",
                                    lineHeight: "1.5",
                                    overflowX: "auto",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    maxHeight: "12rem",
                                    overflowY: "auto",
                                    color: "neutral",
                                })}
                            >
                                {preview}
                            </pre>
                        </div>
                    )}

                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "1rem",
                            flexWrap: "wrap",
                            fontSize: "0.75rem",
                            color: "neutral/60",
                        })}
                    >
                        <span>Source {formatBytes(sourceFile.size)}</span>
                        {outputSize !== null && (
                            <span>Output {formatBytes(outputSize)}</span>
                        )}
                    </div>

                    <Button
                        type="button"
                        onClick={download}
                        isDisabled={!outputUrl}
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            backgroundColor: "primary",
                            color: "background",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            border: "none",
                            _hover: {
                                backgroundColor: "primary/80",
                            },
                            _disabled: {
                                opacity: 0.5,
                                cursor: "not-allowed",
                            },
                        })}
                    >
                        <ButtonContent>
                            <IconDownload size={18} />
                            Download
                            {fileBaseName.trim() === ""
                                ? "converted"
                                : fileBaseName}
                            {outputExtension}
                        </ButtonContent>
                    </Button>
                </div>
            )}
        </div>
    )
}
