import * as yup from "yup";

export const CreateGroupSchema = yup.object({
    groupName: yup
    .string()
    .required("Group Name is required"),
    groupDiscription: yup
    .string()
    .required("Group Description is required"),
});

export const CreateGroupInitialValues = {
    groupName: "",
    groupDiscription: "",
};
