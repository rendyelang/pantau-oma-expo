import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { TouchableOpacity } from "react-native";

const EditButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} className="absolute top-4 right-4 p-3 bg-primary rounded-full items-center justify-center z-10">
      <Feather name="edit" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default EditButton;
