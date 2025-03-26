// helpers.test.ts
import { handleGunSelect, handleAddGun } from "./helpers";
import { jest } from '@jest/globals';

describe("handleGunSelect", () => {
  it("should do nothing if name is an empty string", () => {
    const setSelectedName = jest.fn();
    handleGunSelect("", "AK-47", setSelectedName);
    expect(setSelectedName).not.toHaveBeenCalled();
  });

  it("should deselect the gun if the same gun is clicked", () => {
    const setSelectedName = jest.fn();
    handleGunSelect("AK-47", "AK-47", setSelectedName);
    expect(setSelectedName).toHaveBeenCalledWith("");
  });

  it("should select the gun if a different gun is clicked", () => {
    const setSelectedName = jest.fn();
    handleGunSelect("M4A1", "AK-47", setSelectedName);
    expect(setSelectedName).toHaveBeenCalledWith("M4A1"); 
  });
});

describe("handleAddGun", () => {
    it("should throw an error if the name length is less than 3 characters", () => {
      const result = handleAddGun("ab", "5.5", "3", "bolt-action", "sniper", "200");
      expect(result).toEqual(new Error("Gun name cannot be less than 3 characters"));
    });
    it("should throw an error if caliber is not a number", () => {
        const result1 = handleAddGun("abc", "5.5d", "3", "bolt-action", "sniper", "200");
        expect(result1).toEqual(new Error("Caliber must be a number"));
        const result2 = handleAddGun("abc", "d", "3", "bolt-action", "sniper", "200");
        expect(result2).toEqual(new Error("Caliber must be a number"));
    })
    it("should throw an error if weight is not a number", () => {
        const result1 = handleAddGun("abc", "5.56", "3d", "bolt-action", "sniper", "200");
        expect(result1).toEqual(new Error("Weight must be a number"));
        const result2 = handleAddGun("abc", "5.56", "d", "bolt-action", "sniper", "200");
        expect(result2).toEqual(new Error("Weight must be a number"));
    })
  });




// export const handleAddGun = (name: string, caliber: string, weight: string, actionType: string, category: string | undefined, effectiveRange: string | undefined) => {
//   if (name.length < 3) {
//     return new Error("Gun name cannot be less than 3 characters");
//   }
//   if (!isNumber(caliber)) {
//     return new Error("Caliber must be a number");
//   }
//   if (!isNumber(weight)) {
//     return new Error("Weight must be a number");
//   }
//   const newGun: Gun = {
//     name,
//     caliber: parseFloat(caliber),
//     weight: parseFloat(weight),
//     actionType,
//     category: category ? category : "not specified",
//     effectiveRange: effectiveRange ? parseFloat(effectiveRange) : -1,
//   };
//   return newGun;
// };