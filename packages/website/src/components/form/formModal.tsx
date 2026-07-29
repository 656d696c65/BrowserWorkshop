import { ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@browserworkshop/ui"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { IconX } from "@tabler/icons-react"
import { type ButtonHTMLAttributes, cloneElement, Fragment, type ReactElement, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { type DefaultValues, FormProvider, type UseFormReturn, useForm } from "react-hook-form"
import * as v from "valibot"
import { css } from "../../../styled-system/css"

export function FormModal<T extends Record<string, unknown>, U extends v.GenericSchema<T>>(props: {
    dataProps?: {
        [key in `data-${string}`]?: string
    }
    triggerElement: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
    onTrigger?: () => Promise<void>
    title?: string
    schema: U
    defaultValues: DefaultValues<v.InferOutput<U>>
    submitButtonProps: Parameters<typeof ButtonPlainContent>[0]
    onSubmit: (data: v.InferOutput<U>) => Promise<void>
    onCancel: (data: v.InferOutput<U>) => Promise<void>
    children: (
        // biome-ignore lint/suspicious/noExplicitAny: react-hook-form requires this type parameter
        form: UseFormReturn<v.InferOutput<U>, any, v.InferOutput<U>>,
    ) => ReactElement
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const form = useForm<T>({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: props.defaultValues,
        // biome-ignore lint/suspicious/noExplicitAny: valibotResolver requires this type parameter
        resolver: valibotResolver<T, any, T>(props.schema),
    })

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", handleKey)
        }
        return () => document.removeEventListener("keydown", handleKey)
    }, [isOpen])

    return (
        <Fragment>
            {/* Render trigger button */}
            {cloneElement(props.triggerElement, {
                onClick: async () => {
                    setIsOpen(true)
                    if (props.onTrigger !== undefined) {
                        await props.onTrigger()
                    }
                },
            })}

            {/* Modal */}
            {isOpen === false
                ? null
                : createPortal(
                      // biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop overlay
                      <div
                          {...props.dataProps}
                          id={`modal-${crypto.randomUUID()}`}
                          role="presentation"
                          onClick={() => {
                              setIsOpen(false)
                          }}
                          onKeyDown={(e) => {
                              if (e.key === "Escape") setIsOpen(false)
                          }}
                          className={css({
                              position: "fixed",
                              zIndex: 50,
                              inset: 0,
                              width: "100%",
                              height: "100%",
                              backgroundColor: "neutral/25",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "1rem",
                              md: {
                                  padding: "4rem",
                              },
                          })}
                      >
                          <div
                              className={css({
                                  borderWidth: "1px",
                                  borderColor: "neutral/20",
                                  borderRadius: "0.5rem",
                                  boxShadow: "lg",
                                  overflow: "auto",
                                  width: "100%",
                                  maxWidth: "lg",
                                  maxHeight: "100%",
                                  backgroundColor: "white",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "start",
                                  alignItems: "start",
                              })}
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => {
                                  if (e.key === "Escape") setIsOpen(false)
                              }}
                              role="dialog"
                              aria-modal="true"
                              aria-labelledby="modal-title"
                          >
                              <div
                                  className={css({
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "1rem",
                                      borderBottomWidth: "1px",
                                      borderBottomColor: "neutral/10",
                                      backgroundColor: "neutral/5",
                                  })}
                              >
                                  <span>{props.title}</span>
                                  <button
                                      type="button"
                                      onClick={() => {
                                          setIsOpen(false)
                                      }}
                                      className={css({
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                      })}
                                  >
                                      <ButtonGhostContent leftIcon={<IconX />} />
                                  </button>
                              </div>
                              <FormProvider {...form}>
                                  <form
                                      className={css({
                                          width: "100%",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "start",
                                          alignItems: "start",
                                          gap: "1rem",
                                          padding: "2rem",
                                      })}
                                  >
                                      {props.children(form)}
                                  </form>
                              </FormProvider>
                              <div
                                  className={css({
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "end",
                                      alignItems: "start",
                                      gap: "0.5rem",
                                      padding: "1rem",
                                      borderTopWidth: "1px",
                                      borderTopColor: "neutral/10",
                                  })}
                              >
                                  <button
                                      type="button"
                                      onClick={async (event) => {
                                          event.preventDefault()
                                          setIsOpen(false)
                                      }}
                                      className={css({})}
                                  >
                                      <ButtonOutlineContent className={css({})} text={"Cancel"} />
                                  </button>
                                  <button
                                      type="button"
                                      onClick={async (event) => {
                                          setIsSubmitting(true)

                                          const triggerResponse = await form.trigger()
                                          if (triggerResponse === false) {
                                              console.log(form.formState.errors)
                                              setIsSubmitting(false)
                                              return
                                          }

                                          const data = form.getValues()
                                          const _response = await props.onSubmit(data)

                                          setIsSubmitting(false)

                                          event.preventDefault()
                                      }}
                                      className={css({})}
                                  >
                                      <ButtonPlainContent
                                          {...props.submitButtonProps}
                                          className={css({})}
                                          isLoading={isSubmitting}
                                      />
                                  </button>
                              </div>
                          </div>
                      </div>,
                      document.body,
                  )}
        </Fragment>
    )
}
