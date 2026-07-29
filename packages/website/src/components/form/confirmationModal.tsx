import { ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@browserworkshop/ui"
import { IconX } from "@tabler/icons-react"
import { type ButtonHTMLAttributes, cloneElement, Fragment, type ReactElement, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import * as v from "valibot"
import { css } from "../../../styled-system/css"

export function ConfirmationModal<T extends Record<string, unknown>, _U extends v.GenericSchema<T>>(props: {
    triggerElement: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
    title?: string
    submitButtonProps: Parameters<typeof ButtonPlainContent>[0]
    onSubmit: () => Promise<boolean>
    onCancel: (() => void) | (() => Promise<void>) | undefined
    onSuccess: (() => void) | (() => Promise<void>) | undefined
    children: ReactElement
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)

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
                onClick: () => {
                    setIsOpen(true)
                },
            })}

            {/* Modal */}
            {isOpen === false
                ? null
                : createPortal(
                      // biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop overlay
                      <div
                          id="modal"
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
                                  borderRadius: "0.5rem",
                                  boxShadow: "lg",
                                  width: "100%",
                                  maxWidth: "lg",
                                  maxHeight: "100%",
                                  overflow: "auto",
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
                              <div
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
                                  {props.children}
                              </div>
                              <div
                                  className={css({
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "end",
                                      alignItems: "center",
                                      gap: "0.5rem",
                                      padding: "1rem",
                                      borderTopWidth: "1px",
                                      borderTopColor: "neutral/5",
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
                                          setIsConfirming(true)

                                          const response = await props.onSubmit()
                                          if (response === false) return

                                          setIsConfirming(false)
                                          if (props.onSuccess !== undefined) {
                                              await props.onSuccess()
                                              setIsOpen(false)
                                          }

                                          event.preventDefault()
                                      }}
                                      className={css({})}
                                  >
                                      <ButtonPlainContent
                                          {...props.submitButtonProps}
                                          className={css({})}
                                          isLoading={isConfirming}
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
