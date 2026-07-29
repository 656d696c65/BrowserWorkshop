import { ButtonGhostContent, ButtonOutlineContent, InputPassword, InputText, toast } from "@browserworkshop/ui"
import { IconBook2, IconLogin2, IconUserPlus } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { css } from "../../../styled-system/css/css.js"
import { LinkButton } from "../../components/button/linkButton.js"
import { FormError } from "../../components/form/formError.js"
import { FormField } from "../../components/form/formField.js"
import { FormItem } from "../../components/form/formItem.js"
import { FormLabel } from "../../components/form/formLabel.js"
import { FormRoot } from "../../components/form/formRoot.js"
import { Logo } from "../../components/layouts/logo.js"
import { Separator } from "../../components/layouts/separator.js"
import { websiteRouter } from "../../routes/websiteRouter.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"

export function SignUpPage() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
            })}
        >
            {/* Main content */}
            <section
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingX: "1rem",
                    paddingY: "4rem",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "sm",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        padding: "2rem",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        <LinkButton to="/">
                            <Logo />
                        </LinkButton>
                        <LinkButton to="/documentation" title="Documentation">
                            <ButtonGhostContent
                                leftIcon={<IconBook2 />}
                                className={css({ width: "100%", justifyContent: "center" })}
                            />
                        </LinkButton>
                    </div>

                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <h1
                            className={css({
                                fontSize: "lg",
                                fontWeight: "bold",
                                color: "neutral",
                            })}
                        >
                            Inscription
                        </h1>
                        <p
                            className={css({
                                color: "neutral/60",
                                fontSize: "sm",
                            })}
                        >
                            Créez votre compte gratuitement
                        </p>
                    </div>

                    <FormRoot
                        schema={v.object({ email: v.string(), password: v.string(), confirmPassword: v.string() })}
                        defaultValues={{}}
                        submitButtonProps={{
                            leftIcon: <IconUserPlus />,
                            text: "Créer un compte",
                            className: css({ width: "100%", justifyContent: "center" }),
                        }}
                        submitOnPressEnterKey={true}
                        onSubmit={async (data) => {
                            if (data.password !== data.confirmPassword) {
                                toast({ title: "Les mots de passe ne correspondent pas", variant: "error" })
                                return false
                            }

                            const response = await getResponseBodyFromAPI({
                                routeDefinition: {
                                    path: "/sign-up",
                                    schemas: { output: v.object({}) as v.ObjectSchema<v.ObjectEntries, undefined> },
                                },
                                body: data,
                            })
                            if (!response.ok) {
                                toast({ title: "Inscription impossible", variant: "error" })
                                return false
                            }

                            toast({ title: "Inscription réussie", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={() => {
                            websiteRouter.navigate({
                                to: "/dashboard",
                                reloadDocument: true,
                            })
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Email" isRequired={false} description={undefined} />
                                            <InputText value={field.value} onChange={field.onChange} type="email" />
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Mot de passe"
                                                isRequired={false}
                                                description={undefined}
                                            />
                                            <InputPassword value={field.value} onChange={field.onChange} />
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Mot de passe (encore)"
                                                isRequired={false}
                                                description={undefined}
                                            />
                                            <InputPassword value={field.value} onChange={field.onChange} />
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                            </Fragment>
                        )}
                    </FormRoot>

                    <Separator />

                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "stretch",
                            gap: "0.5rem",
                        })}
                    >
                        <LinkButton to="/connexion" className={css({ width: "100%" })}>
                            <ButtonOutlineContent
                                leftIcon={<IconLogin2 />}
                                text="Se connecter"
                                className={css({ width: "100%", justifyContent: "center" })}
                            />
                        </LinkButton>
                    </div>
                </div>
            </section>
        </div>
    )
}
