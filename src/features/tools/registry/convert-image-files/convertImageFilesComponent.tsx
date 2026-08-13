import { IconDownload, IconUpload } from "@tabler/icons-react"
import {
    type ChangeEvent,
    type DragEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { Button } from "@/components/button/button"
import { ButtonContent } from "@/components/button/buttonContent"
import { InputSelect } from "@/components/inputs/inputSelect"
import { InputText } from "@/components/inputs/inputText"
import { Section } from "@/components/layouts/section"
import { css } from "@/styled-system/css"

interface OutputFormat {
    id: string
    label: string
    mimeType: string
    extension: string
    lossy: boolean
    codec: string
    algorithm: string
    engineSource: string
}

const outputFormats: OutputFormat[] = [
    {
        id: "png",
        label: "PNG",
        mimeType: "image/png",
        extension: "png",
        lossy: false,
        codec: "PNG (DEFLATE/IDAT)",
        algorithm: "Lossless RGBA compression via PNG chunks + zlib/DEFLATE",
        engineSource: "https://github.com/glennrp/libpng",
    },
    {
        id: "jpeg",
        label: "JPEG",
        mimeType: "image/jpeg",
        extension: "jpg",
        lossy: true,
        codec: "JPEG (ITU-T T.81 Annex T)",
        algorithm:
            "Lossy DCT-based compression with chroma subsampling + quantization",
        engineSource: "https://github.com/libjpeg-turbo/libjpeg-turbo",
    },
    {
        id: "webp",
        label: "WebP",
        mimeType: "image/webp",
        extension: "webp",
        lossy: true,
        codec: "WebP (VP8 / VP8L)",
        algorithm:
            "VP8 intra-frame coding (lossy) or VP8L (lossless) + alpha channel",
        engineSource: "https://github.com/webmproject/libwebp",
    },
    {
        id: "avif",
        label: "AVIF",
        mimeType: "image/avif",
        extension: "avif",
        lossy: true,
        codec: "AVIF (AV1 intra-frame)",
        algorithm:
            "AV1 (AOM) intra-frame encoding with HEVC-style coding tools; supports HDR + alpha",
        engineSource: "https://aomedia.org/",
    },
]

const codecs: Record<string, OutputFormat> = Object.fromEntries(
    outputFormats.map((format) => [
        format.id,
        format,
    ]),
)

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

export default function ConvertImageFilesComponent() {
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
    const inputRef = useRef<HTMLInputElement | null>(null)

    const availableFormats = useMemo(
        () =>
            outputFormats.filter((format) => supportsMimeType(format.mimeType)),
        [],
    )

    const outputFormat =
        availableFormats.find((format) => format.id === outputFormatId) ??
        availableFormats[0]

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
        const baseName = fileBaseName.trim() === "" ? "image" : fileBaseName
        const link = document.createElement("a")
        link.href = outputUrl
        link.download = `${baseName}.${outputFormat.extension}`
        link.click()
    }

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
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
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    height: "fit-content",
                    padding: "1rem",
                    borderRadius: "0.25rem",
                    borderWidth: "1px",
                    borderStyle: "dashed",
                    borderColor: dragActive ? "primary" : "neutral/20",
                    backgroundColor: dragActive ? "primary/10" : "neutral/1",
                    cursor: "pointer",
                    _hover: {
                        borderColor: "primary",
                        backgroundColor: "primary/10",
                    },
                })}
            >
                <span
                    className={css({
                        color: "primary",
                    })}
                >
                    <IconUpload size={24} />
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
                <>
                    {/* Input section: source image + information */}
                    <Section>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                gap: "0.5rem",
                                width: "100%",
                            })}
                        >
                            {sourceDataUrl && (
                                <img
                                    src={sourceDataUrl}
                                    alt={sourceFile?.name ?? "Preview"}
                                    className={css({
                                        width: "100%",
                                        maxHeight: "16rem",
                                        objectFit: "contain",
                                        borderRadius: "0.375rem",
                                    })}
                                />
                            )}
                            <div
                                className={css({
                                    height: "fit-content",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "0.5rem",
                                    fontSize: "0.75rem",
                                    color: "neutral/60",
                                })}
                            >
                                <span>Format</span>
                                <strong
                                    className={css({
                                        fontWeight: "600",
                                    })}
                                >
                                    {codecs[sourceFormatId ?? ""]?.label ??
                                        sourceFormatId ??
                                        "—"}
                                </strong>
                                <span>Dimensions</span>
                                <strong
                                    className={css({
                                        fontWeight: "600",
                                    })}
                                >
                                    {image.naturalWidth}×{image.naturalHeight}
                                </strong>
                                <span>Name</span>
                                <strong
                                    className={css({
                                        fontWeight: "600",
                                    })}
                                >
                                    {sourceFile.name}
                                </strong>
                                <span>Size</span>
                                <strong
                                    className={css({
                                        fontWeight: "600",
                                    })}
                                >
                                    {formatBytes(sourceFile.size)}
                                </strong>
                            </div>
                        </div>
                    </Section>

                    {/* Output section: controls */}
                    <Section>
                        <InputSelect
                            value={outputFormatId}
                            onChange={(next) => {
                                if (!next) return
                                if (next === sourceFormatId) return
                                setOutputFormatId(next)
                            }}
                            searchable
                            isFullWidth
                            placeholder="Convert to"
                            options={availableFormats
                                .filter(
                                    (format) => format.id !== sourceFormatId,
                                )
                                .map((format) => ({
                                    key: format.id,
                                    label: format.label,
                                }))}
                        />

                        {outputFormat.lossy && (
                            <div
                                className={css({
                                    width: "100%",
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
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "stretch",
                                gap: "0.25rem",
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
                                <InputText
                                    id="image-file-name"
                                    aria-label="File name"
                                    value={fileBaseName}
                                    onChange={(value) => {
                                        if (!value) return
                                        setFileBaseName(value)
                                    }}
                                />
                                <span
                                    className={css({
                                        color: "neutral/50",
                                        fontSize: "0.875rem",
                                    })}
                                >
                                    .
                                </span>
                                <div
                                    className={css({
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0.5rem",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderColor: "neutral/20",
                                        borderRadius: "0.375rem",
                                        backgroundColor: "neutral/5",
                                    })}
                                >
                                    <span
                                        className={css({
                                            fontSize: "0.875rem",
                                            lineHeight: 1,
                                            color: "neutral",
                                        })}
                                    >
                                        {outputFormat.extension}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={download}
                            isDisabled={!outputUrl}
                            title="Download image"
                            className={css({
                                marginLeft: "auto",
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
                            <ButtonContent
                                leftIcon={<IconDownload />}
                                text="Download"
                            />
                        </Button>

                        {outputFormat && (
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.25rem",
                                    fontSize: "0.75rem",
                                    color: "neutral/60",
                                    padding: "0.5rem",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "neutral/20",
                                    borderRadius: "0.375rem",
                                    backgroundColor: "neutral/5",
                                })}
                            >
                                <span>
                                    Codec:{" "}
                                    <a
                                        href={outputFormat.engineSource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={css({
                                            color: "primary",
                                            fontWeight: "600",
                                        })}
                                    >
                                        {codecs[outputFormat.id].codec}
                                    </a>
                                </span>
                                <span>
                                    Algorithm:{" "}
                                    {codecs[outputFormat.id].algorithm}
                                </span>
                                {outputSize !== null && (
                                    <span>
                                        Output size: {formatBytes(outputSize)}
                                    </span>
                                )}
                                <span>
                                    Encoded by the browser via{" "}
                                    <code>
                                        canvas.toBlob("{outputFormat.mimeType}")
                                    </code>
                                    {outputFormat.lossy &&
                                        ", quality controlled with the slider above"}
                                    .
                                </span>
                                {availableFormats.length <
                                    outputFormats.length && (
                                    <span>
                                        {outputFormats.length -
                                            availableFormats.length +
                                            " "}
                                        format(s) hidden — your browser does not
                                        advertise support for them via canvas.
                                    </span>
                                )}
                            </div>
                        )}
                    </Section>
                </>
            )}
        </div>
    )
}
