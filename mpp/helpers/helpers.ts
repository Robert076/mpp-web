export function isNumber(numStr: string) {
  return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
}
export const handleAddGun = (name: string, caliber: string, weight: string, actionType: string, category: string | undefined, effectiveRange: string | undefined) => {
  if (name.length < 3) {
    throw new Error("Gun name cannot be less than 3 characters");
  }
  if (!isNumber(caliber)) {
    throw new Error("Caliber must be a number");
  }
  if (!isNumber(weight)) {
    throw new Error("Weight must be a number");
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

export const handleGunSelect = (name: string, selectedName: string, setSelectedName: (name: string) => void) => {
  if(name == "") {
    return;
  }
  if(name === selectedName) {
  setSelectedName("");
  }
  else {
    setSelectedName(name);
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

  const gunIndex = guns.findIndex((gun) => gun.name === name);

  if (gunIndex === -1) {
    throw new Error("Gun not found");
  }

  if (name.length < 3) {
    throw new Error("Gun name cannot be less than 3 characters");
  }
  if (!isNumber(caliber)) {
    throw new Error("Caliber must be a number");
  }
  if (!isNumber(weight)) {
    throw new Error("Weight must be a number");
}

const updatedGun: Gun = {
  name,
  caliber: parseFloat(caliber),
  weight: parseFloat(weight),
  actionType,
  category: category ? category : "not specified",
  effectiveRange: effectiveRange ? parseFloat(effectiveRange) : -1,
};

const updatedGuns = [...guns];
updatedGuns[gunIndex] = updatedGun;

return updatedGuns; 
};

export const sortByNameAsc = (guns: Gun[]) => {
  const sortedArray: Gun[] = [...guns].sort((gun1, gun2) => {
    if(gun1.name > gun2.name) {
      return 1;
    }
    if(gun1.name < gun2.name) {
      return -1;
    }
    return 0;
  })
  return sortedArray;
  }

export const sortByNameDesc = (guns: Gun[]) => {
  const sortedArray: Gun[] = [...guns].sort((gun1, gun2) => {
    if(gun1.name > gun2.name) {
      return -1;
    }
    if(gun1.name < gun2.name) {
      return 1;
    }
    return 0;
  })
  return sortedArray;
}

export const sortByCaliberAsc = (guns: Gun[]) => {
  const sortedArray: Gun[] = [...guns].sort((gun1, gun2) => {
    if(gun1.caliber > gun2.caliber) {
      return 1;
    }
    if(gun1.caliber < gun2.caliber) {
      return -1;
    }
    return 0;
  })
  return sortedArray;
}

export const sortByCaliberDesc = (guns: Gun[]) => {
  const sortedArray: Gun[] = [...guns].sort((gun1, gun2) => {
    if(gun1.caliber > gun2.caliber) {
      return -1;
    }
    if(gun1.caliber < gun2.caliber) {
      return 1;
    }
    return 0;
  })
  return sortedArray;
}

export const handleHighlightedBig = (guns: Gun[], setHighlightedGunName: (name: string) => void, ) => {
  if (guns.length === 0) {
    throw new Error("There are no guns to higlight");
  }
  
  const highestCaliber = Math.max(...guns.map((gun) => gun.caliber));
  const biggestCaliberGun = guns.find((gun) => gun.caliber === highestCaliber);

  if (biggestCaliberGun) {
    setHighlightedGunName(biggestCaliberGun.name);
  }

  return biggestCaliberGun?.name;
}

export const handleHighlightedSmall = (guns: Gun[], setHighlightedGunName: (name: string) => void, ) => {
  if (guns.length === 0) {
    throw new Error("There are no guns to higlight");
  }
  
  const smallestCaliber = Math.min(...guns.map((gun) => gun.caliber));
  const smallestCaliberGun = guns.find((gun) => gun.caliber === smallestCaliber);

  if (smallestCaliberGun) {
    setHighlightedGunName(smallestCaliberGun.name);
  }

  return smallestCaliberGun?.name;
}

export const handlePageChange = (page: number, setCurrentPage: (newPage: number) => void) => {
  setCurrentPage(page);
};

export const handleNextPage = (currentPage: number, totalPages: number, setCurrentPage: (newPage: number) => void) => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

export const handlePreviousPage = (currentPage: number, totalPages: number, setCurrentPage: (newPage: number) => void) => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};
