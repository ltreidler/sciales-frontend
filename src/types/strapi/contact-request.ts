//type for sending contact requests to strapi

//form values from the contact form
export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  pronouns: string;
  phone: string;
  message: string;
}

export type FormNames = keyof FormValues;

//contact request to send to strapi
export interface ContactRequest extends FormValues {
  dateSent: Date;
  contactType: "lesson" | "general";
}
