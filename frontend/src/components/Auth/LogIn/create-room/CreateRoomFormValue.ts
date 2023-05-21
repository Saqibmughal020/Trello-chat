import * as yup from "yup";

export const CreateRoomSchema = yup.object({
  roomName: yup.string().required("Room Name is required"),
  description: yup.string().required("Description is required"),
});

export const CreateRoomInitialValues = {
  roomName: "",
  description: "",
};
