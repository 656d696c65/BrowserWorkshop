import { Button, ButtonContent } from "@browserworkshop/shared"
import { IconDownload, IconPhoto, IconUpload } from "@tabler/icons-react"
import {
    type ChangeEvent,
    type DragEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { css } from "../../styled-system/css"

interface OutputFormat {
    id: string
    label: string
    mimeType: string
    extension: string
    lossy: boolean
}

const outputFormats: OutputFormat[] = [
    {
        id: "png",
        label: "PNG",
        mimeType: "image/png",
        extension: "png",
        lossy: false,
    },
    {
        id: "jpeg",
        label: "JPEG",
        mimeType: "image/jpeg",
        extension: "jpg",
        lossy: true,
    },
    {
        id: "webp",
        label: "WebP",
        mimeType: "image/webp",
        extension: "webp",
        lossy: true,
    },
    {
        id: "avif",
        label: "AVIF",
        mimeType: "image/avif",
        extension: "avif",
        lossy: true,
    },
]

function supportsMimeType(mimeType: string): boolean {
    const canvas = document.createElement("canvas")
    return canvas.toDataURL(mimeType).startsWith(`data:${mimeType}`)
}

function detectSourceFormat(file: File): string | null {
    const byMime = outputFormats.find((format) => format.mimeType === file.type)
    if (byMime) return byMime.id
    const ext =
        file.name
            .match(/\.[^/.]+$/)?.[0]
            ?.toLowerCase()
            .slice(1) ?? ""
    const byExt = outputFormats.find((format) => format.extension === ext)
    return byExt?.id ?? null
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function ImageConverter() {
    const [sourceFile, setSourceFile] = useState<File | null>(null)
    const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null)
    const [image, setImage] = useState<HTMLImageElement | null>(null)
    const [outputFormatId, setOutputFormatId] = useState<string>("png")
    const [quality, setQuality] = useState<number>(90)
    const [outputUrl, setOutputUrl] = useState<string | null>(null)
    const [outputSize, setOutputSize] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)
    const [sourceFormatId, setSourceFormatId] = useState<string | null>(null)
    const [fileBaseName, setFileBaseName] = useState<string>("image")
    const [customExtension, setCustomExtension] = useState<string>("png")
    const inputRef = useRef<HTMLInputElement | null>(null)

    const availableFormats = useMemo(
        () =>
            outputFormats.filter((format) => supportsMimeType(format.mimeType)),
        [],
    )

    const outputFormat =
        availableFormats.find((format) => format.id === outputFormatId) ??
        availableFormats[0]

    useEffect(() => {
        if (!outputFormat) return
        setCustomExtension(outputFormat.extension)
    }, [
        outputFormat,
    ])

    function loadFile(file: File | undefined | null) {
        if (!file) return
        if (!file.type.startsWith("image/")) {
            setError(
                "Please choose an image file (PNG, JPEG, GIF, WebP, BMP, SVG…).",
            )
            return
        }
        setError(null)
        setSourceFile(file)
        setSourceDataUrl(null)
        setImage(null)
        setOutputUrl(null)
        setOutputSize(null)
        setFileBaseName(file.name.replace(/\.[^/.]+$/, ""))
        setSourceFormatId(detectSourceFormat(file))
        setOutputFormatId((prev) => {
            const sourceId = detectSourceFormat(file)
            if (prev === sourceId && sourceId !== null) {
                const alternate = availableFormats.find(
                    (format) => format.id !== sourceId,
                )
                return alternate?.id ?? prev
            }
            return prev
        })

        const reader = new FileReader()
        reader.onload = () => {
            setSourceDataUrl(
                typeof reader.result === "string" ? reader.result : null,
            )
        }
        reader.readAsDataURL(file)

        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
            setImage(img)
            URL.revokeObjectURL(url)
        }
        img.onerror = () => {
            URL.revokeObjectURL(url)
            setError("Failed to read the image file.")
        }
        img.src = url
    }

    useEffect(() => {
        if (!image) return
        let cancelled = false

        const format =
            outputFormats.find((f) => f.id === outputFormatId) ??
            outputFormats[0]

        const MAX_DIMENSION = 16384
        let width = image.naturalWidth
        let height = image.naturalHeight
        const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))
        if (scale < 1) {
            width = Math.round(width * scale)
            height = Math.round(height * scale)
        }

        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext("2d")
        if (!context) {
            setError("Canvas is not supported in this browser.")
            return
        }
        context.drawImage(image, 0, 0, width, height)

        canvas.toBlob(
            (blob) => {
                if (cancelled) return
                if (!blob) {
                    setError("Conversion failed.")
                    return
                }
                const url = URL.createObjectURL(blob)
                setOutputUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev)
                    return url
                })
                setOutputSize(blob.size)
            },
            format.mimeType,
            format.lossy ? quality / 100 : undefined,
        )

        return () => {
            cancelled = true
        }
    }, [
        image,
        outputFormatId,
        quality,
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
        if (!outputUrl || !sourceFile || !outputFormat) return
        const extension =
            customExtension.trim() === ""
                ? outputFormat.extension
                : customExtension.replace(/^\./, "")
        const baseName = fileBaseName.trim() === "" ? "image" : fileBaseName
        const link = document.createElement("a")
        link.href = outputUrl
        link.download = `${baseName}.${extension}`
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
                {sourceDataUrl ? (
                    <img
                        src={sourceDataUrl}
                        alt={sourceFile?.name ?? "Preview"}
                        className={css({
                            maxWidth: "100%",
                            maxHeight: "16rem",
                            objectFit: "contain",
                            borderRadius: "0.25rem",
                        })}
                    />
                ) : (
                    <>
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
                            Drop an image here or click to browse
                        </span>
                        <span
                            className={css({
                                fontSize: "0.75rem",
                                color: "neutral/50",
                            })}
                        >
                            PNG · JPEG · WebP · AVIF
                        </span>
                    </>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className={css({
                        display: "none",
                    })}
                />
            </label>

            {sourceFile && image && outputFormat && (
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
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "0.75rem",
                                color: "neutral/50",
                            })}
                        >
                            Convert to
                        </span>
                        {availableFormats.map((format) => {
                            const isCurrent = sourceFormatId === format.id
                            const isSelected = format.id === outputFormat.id
                            return (
                                <Button
                                    key={format.id}
                                    type="button"
                                    onClick={() => setOutputFormatId(format.id)}
                                    isDisabled={isCurrent}
                                    className={css({
                                        padding: "0.375rem 0.75rem",
                                        borderRadius: "0.375rem",
                                        borderWidth: "1px",
                                        borderColor: isSelected
                                            ? "primary"
                                            : "neutral/20",
                                        backgroundColor: isSelected
                                            ? "primary/10"
                                            : "transparent",
                                        color: "neutral",
                                        fontSize: "0.875rem",
                                        cursor: isCurrent
                                            ? "not-allowed"
                                            : "pointer",
                                        opacity: isCurrent ? 0.5 : 1,
                                        textDecoration: isCurrent
                                            ? "line-through"
                                            : "none",
                                        _hover: isCurrent
                                            ? {}
                                            : {
                                                  borderColor: "primary",
                                              },
                                    })}
                                >
                                    <ButtonContent>
                                        {format.label}
                                        {isCurrent && " · current"}
                                    </ButtonContent>
                                </Button>
                            )
                        })}
                    </div>

                    {outputFormat.lossy && (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "stretch",
                                gap: "0.25rem",
                            })}
                        >
                            <div
                                className={css({
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                })}
                            >
                                <label
                                    htmlFor="image-quality"
                                    className={css({
                                        fontSize: "0.75rem",
                                        color: "neutral/60",
                                    })}
                                >
                                    Quality
                                </label>
                                <span
                                    className={css({
                                        fontSize: "0.75rem",
                                        color: "neutral/60",
                                    })}
                                >
                                    {quality}%
                                </span>
                            </div>
                            <input
                                id="image-quality"
                                type="range"
                                min={10}
                                max={100}
                                value={quality}
                                onChange={(event) =>
                                    setQuality(Number(event.target.value))
                                }
                                className={css({
                                    width: "100%",
                                    accentColor: "primary",
                                })}
                            />
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
                        <span
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.25rem",
                            })}
                        >
                            <IconPhoto size={14} />
                            {image.naturalWidth}×{image.naturalHeight}
                        </span>
                        {sourceFile && (
                            <span>Source {formatBytes(sourceFile.size)}</span>
                        )}
                        {outputSize !== null && (
                            <span>Output {formatBytes(outputSize)}</span>
                        )}
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
                            htmlFor="image-file-name"
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
                                id="image-file-name"
                                type="text"
                                value={fileBaseName}
                                onChange={(event) =>
                                    setFileBaseName(event.currentTarget.value)
                                }
                                aria-label="File name"
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
                                id="image-file-extension"
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
                            Download {outputFormat.label}
                        </ButtonContent>
                    </Button>
                </div>
            )}
        </div>
    )
}
