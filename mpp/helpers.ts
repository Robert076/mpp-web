function isNumber(numStr: string) {
    return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
}
export const handleAddGun = (name: string, caliber: string, weight: string, actionType: string, category: string | undefined, effectiveRange: string | undefined) => {
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

export const handleGunSelect = (index: number, selectedIndex: number | null, setSelectedIndex: (index: number | null) => void) => {
  if(index === selectedIndex) {
    setSelectedIndex(null);
  }
  else {
    setSelectedIndex(index);
  }
}

export const handleUpdateGun = (
  guns: Gun[],
  name: string,
  caliber: string,
  weight: string,
  actionType: string,
  category: string | undefined,
  effectiveRange: string | undefined
) => {
  // Find the index of the gun with the matching name
  const gunIndex = guns.findIndex((gun) => gun.name === name);
  
  if (gunIndex === -1) {
    return new Error("Gun not found");
  }

  // Validate inputs
  if (name.length < 3) {
    return new Error("Gun name cannot be less than 3 characters");
  }
  if (!isNumber(caliber)) {
    return new Error("Caliber must be a number");
  }
  if (!isNumber(weight)) {
    return new Error("Weight must be a number");
  }

  // Create the updated gun object
  const updatedGun: Gun = {
    name,
    caliber: parseFloat(caliber),
    weight: parseFloat(weight),
    actionType,
    category: category ? category : "not specified",
    effectiveRange: effectiveRange ? parseFloat(effectiveRange) : -1,
  };

  // Update the gun in the guns array
  const updatedGuns = [...guns];
  updatedGuns[gunIndex] = updatedGun;

  return updatedGuns; // Return the updated guns array
};
