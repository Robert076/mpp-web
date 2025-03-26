import { handleGunSelect, handleAddGun, handleUpdateGun, sortByNameAsc, sortByNameDesc, sortByCaliberAsc, sortByCaliberDesc, handleHighlighted } from "./helpers";
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
    it("should return the newly created gun when input is correct", () => {
        const expectedGun = {
            name: "M4A1-S",
            caliber: 5.56,
            weight: 2.1,
            actionType: "fully-automatic",
            category: "rifle",
            effectiveRange: 1200,
        }
        const result = handleAddGun("M4A1-S", "5.56", "2.1", "fully-automatic", "rifle", "1200");
        expect(result).toEqual(expectedGun)
    })
});

describe("handleUpdateGun", () => {
  it("should return an error if the gun is not found", () => {
    const guns = [
      { name: "AK-47", caliber: 7.62, weight: 3.3, actionType: "gas-operated", category: "assault", effectiveRange: 800 },
    ];
    const result = handleUpdateGun(guns, "M4A1", "5.56", "3.2", "gas-operated", "rifle", "900");
    expect(result).toEqual(new Error("Gun not found"));
  });

  it("should throw an error if name length is less than 3 characters", () => {
    const guns = [
      { name: "AK-47", caliber: 7.62, weight: 3.3, actionType: "gas-operated", category: "assault", effectiveRange: 800 },
    ];
    const result = handleUpdateGun(guns, "AK", "5.56", "3.2", "gas-operated", "rifle", "900");
    expect(result).toEqual(new Error("Gun not found"));
  });

  it("should throw an error if caliber is not a number", () => {
    const guns = [
      { name: "AK-47", caliber: 7.62, weight: 3.3, actionType: "gas-operated", category: "assault", effectiveRange: 800 },
    ];
    const result = handleUpdateGun(guns, "AK-47", "5.5d", "3.2", "gas-operated", "rifle", "900");
    expect(result).toEqual(new Error("Caliber must be a number"));
  });

  it("should throw an error if weight is not a number", () => {
    const guns = [
      { name: "AK-47", caliber: 7.62, weight: 3.3, actionType: "gas-operated", category: "assault", effectiveRange: 800 },
    ];
    const result = handleUpdateGun(guns, "AK-47", "5.56", "3d", "gas-operated", "rifle", "900");
    expect(result).toEqual(new Error("Weight must be a number"));
  });

  it("should return updated guns array", () => {
    const guns = [
      { name: "AK-47", caliber: 7.62, weight: 3.3, actionType: "gas-operated", category: "assault", effectiveRange: 800 },
    ];
    const updatedGuns = handleUpdateGun(guns, "AK-47", "5.56", "3.5", "bolt-action", "rifle", "900");
    expect(updatedGuns).toEqual([
      { name: "AK-47", caliber: 5.56, weight: 3.5, actionType: "bolt-action", category: "rifle", effectiveRange: 900 },
    ]);
  });
});

describe("Sorting functions", () => {
  const guns = [
    { name: "AK-47", caliber: 7.62, weight: 3.3, actionType: "gas-operated", category: "assault", effectiveRange: 800 },
    { name: "M4A1", caliber: 5.56, weight: 2.9, actionType: "gas-operated", category: "assault", effectiveRange: 1000 },
    { name: "M1 Garand", caliber: 30.06, weight: 4.3, actionType: "gas-operated", category: "rifle", effectiveRange: 1000 },
  ];

  it("should sort guns by name ascending", () => {
    const sorted = sortByNameAsc(guns);
    expect(sorted[0].name).toBe("AK-47");
    expect(sorted[1].name).toBe("M1 Garand");
    expect(sorted[2].name).toBe("M4A1");
  });

  it("should sort guns by name descending", () => {
    const sorted = sortByNameDesc(guns);
    expect(sorted[0].name).toBe("M4A1");
    expect(sorted[1].name).toBe("M1 Garand");
    expect(sorted[2].name).toBe("AK-47");
  });

  it("should sort guns by caliber ascending", () => {
    const sorted = sortByCaliberAsc(guns);
    expect(sorted[0].caliber).toBe(5.56);
    expect(sorted[1].caliber).toBe(7.62);
    expect(sorted[2].caliber).toBe(30.06);
  });

  it("should sort guns by caliber descending", () => {
    const sorted = sortByCaliberDesc(guns);
    expect(sorted[0].caliber).toBe(30.06);
    expect(sorted[1].caliber).toBe(7.62);
    expect(sorted[2].caliber).toBe(5.56);
  });
});

describe("handleHighlighted", () => {
  it("should return an error if there are no guns to highlight", () => {
    const result = handleHighlighted([], jest.fn());
    expect(result).toEqual(new Error("There are no guns to higlight"));
  });

  it("should highlight the gun with the highest caliber", () => {
    const setHighlightedGunName = jest.fn();
    const result = handleHighlighted(
      [
        { name: "AK-47", caliber: 7.62, weight: 3.3, actionType: "gas-operated", category: "assault", effectiveRange: 800 },
        { name: "M4A1", caliber: 5.56, weight: 2.9, actionType: "gas-operated", category: "assault", effectiveRange: 1000 },
        { name: "M1 Garand", caliber: 30.06, weight: 4.3, actionType: "gas-operated", category: "rifle", effectiveRange: 1000 },
      ],
      setHighlightedGunName
    );
    expect(result).toBe("M1 Garand");
    expect(setHighlightedGunName).toHaveBeenCalledWith("M1 Garand");
  });
});
