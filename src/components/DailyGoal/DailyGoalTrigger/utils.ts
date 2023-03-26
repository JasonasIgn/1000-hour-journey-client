export const getColor = (isOpen: boolean, completed?: boolean) => {
  if (isOpen) {
    if (completed) {
      return "green.100";
    }
    return "yellow.500";
  }
  return completed ? "green.200" : "yellow.600";
};
