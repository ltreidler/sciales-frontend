/** @jsxImportSource @emotion/react */
import { mq, fontWeights } from "./global";
import { camelCase } from "../../utils";
import { css } from "@emotion/react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FormValues, FormNames } from "../../types";

interface InputProps {
  label: string;
  type?: "text" | "textarea";
  required?: boolean;
  width?: string;
  minLength?: number;
  placeholder?: string;
  midWidth?: string;
}

interface Validation {
  required?: { value: boolean; message: string };
  minLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
}

export const Input = ({
  label,
  type = "text",
  required = true,
  width = "100%",
  minLength,
  placeholder = "",
  midWidth,
}: InputProps) => {
  const inputStyles = css(
    mq({
      borderRadius: 0,
      border: "1.5px solid black",
      height: type === "textarea" ? "10rem" : "1rem",
      padding: "0.5rem",
      fontSize: "16px",
    })
  );

  const wrapperStyles = css(
    mq({
      display: "flex",
      flexFlow: "column nowrap",
      padding: "0.5rem",
      minWidth: "10rem",
      width: ["100%", "100%", "100%", midWidth || "100%", width],
    })
  );

  const labelStyles = css(
    mq({
      fontSize: ["18px", "17px", "16px", "15px"],
      marginBottom: "0.1rem",
      fontWeight: fontWeights.medium,
    })
  );

  const errorStyles = css(
    mq({
      color: "red",
      fontSize: "13px",
      marginTop: "0.1rem",
    })
  );

  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  //create name from label
  const name = camelCase(label) as FormNames;

  //create validation object for react-hook-form
  const validation: Validation = {};
  if (required)
    validation.required = { value: true, message: "This field is required" };
  if (minLength)
    validation.minLength = {
      value: minLength,
      message: `Must be at least ${minLength} characters long`,
    };
  if (name === "email")
    validation.pattern = {
      value: /^\S+@\S+$/i,
      message: "Must be a valid email address",
    };
  if (name === "phone")
    validation.minLength = {
      value: 5,
      message: "Must be a valid phone number",
    };

  const inputProps = {
    id: name,
    css: inputStyles,
    placeholder,
    ...register(name, validation),
  };

  return (
    <div css={wrapperStyles}>
      <label css={labelStyles} htmlFor={name}>
        {label}{" "}
        {required ? <span css={{ color: "red" }}>*</span> : "(optional)"}
      </label>
      {type === "textarea" ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
      <p css={errorStyles}>
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
