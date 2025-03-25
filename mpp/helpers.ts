function isNumber(numStr: string) {
    return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
}
export const handleAddGun = (name: string, caliber: string, weight: string, actionType: string, category: string, effectiveRange: string) => {
    if (name.length < 3) {
      return new Error("Gun name cannot be less than 3 characters");
    }
    if (!isNumber(caliber)) {
      return new Error("Caliber must be a number");
    }
    if (!isNumber(weight)) {
      return new Error("Weight must be a number");
    }
    const newGun: Gun = {
      name,
      caliber: parseFloat(caliber),
      weight: parseFloat(weight),
      actionType,
      category: category ? category : "not specified",
      effectiveRange: effectiveRange ? parseFloat(effectiveRange) : -1,
    };
    return newGun;
  };