import { NextRequest, NextResponse } from 'next/server';
import { isNumber } from "@/helpers/helpers";

interface Gun {
    id?: number;
    name: string;
    caliber: number;
    weight: number;
    actionType: string;
    category?: string;
    effectiveRange?: number;
    selected?: boolean;
    highlightedBlue?: boolean;
    highlightedRed?: boolean;
}

let guns: Gun[] = [];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const sortByName = url.searchParams.get('sortByName'); // Get sorting by name (asc/desc)
  const sortByCaliber = url.searchParams.get('sortByCaliber'); // Get sorting by caliber (asc/desc)

  let filteredGuns = guns;

  // Filtering by category "rifle" only
  filteredGuns = guns.filter(gun => gun.category?.toLowerCase() === "rifle");

  // Sorting by name
  if (sortByName) {
      if (sortByName === 'asc') {
          filteredGuns = filteredGuns.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortByName === 'desc') {
          filteredGuns = filteredGuns.sort((a, b) => b.name.localeCompare(a.name));
      }
  }

  // Sorting by caliber
  if (sortByCaliber) {
      if (sortByCaliber === 'asc') {
          filteredGuns = filteredGuns.sort((a, b) => a.caliber - b.caliber);
      } else if (sortByCaliber === 'desc') {
          filteredGuns = filteredGuns.sort((a, b) => b.caliber - a.caliber);
      }
  }

  return NextResponse.json(filteredGuns);
}


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, caliber, weight, actionType, category, effectiveRange } = body;

        if (!name || !caliber || !weight || !actionType || name.length < 3 || !isNumber(caliber) || !isNumber(weight) || (effectiveRange && !isNumber(effectiveRange))) {
            return NextResponse.json(
                { error: 'Bad request: Either null fields or invalid data' },
                { status: 400 }
            );
        }

        if (guns.some(gun => gun.name === name)) {
            return NextResponse.json(
                { error: `Gun with the name ${name} already exists` },
                { status: 409 }
            );
        }

        const newGun: Gun = {
            id: guns.length > 0 ? guns[guns.length - 1].id! + 1 : 1,
            name,
            caliber,
            weight,
            actionType,
            category,
            effectiveRange
        };

        guns.push(newGun);
        return NextResponse.json(newGun, { status: 201 });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { name, caliber, weight, actionType, category, effectiveRange } = body;

        if (!name || !caliber || !weight || !actionType || name.length < 3 || !isNumber(caliber) || !isNumber(weight) || (effectiveRange && !isNumber(effectiveRange))) {
            return NextResponse.json(
                { error: 'Bad request: Either null fields or invalid data' },
                { status: 400 }
            );
        }

        const gunIndex = guns.findIndex(gun => gun.name === name);
        if (gunIndex === -1) {
            return NextResponse.json(
                { error: `You can only update already existing guns.` },
                { status: 409 }
            );
        }

        guns[gunIndex] = { ...guns[gunIndex], caliber, weight, actionType, category, effectiveRange };
        return NextResponse.json(guns[gunIndex], { status: 200 });
    } catch (error) {
        console.error('Error updating data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { name } = body;

        const gunIndex = guns.findIndex(gun => gun.name === name);
        if (gunIndex === -1) {
            return NextResponse.json(
                { error: `You can only delete already existing guns.` },
                { status: 409 }
            );
        }

        const deletedGun = guns.splice(gunIndex, 1)[0];
        return NextResponse.json(deletedGun, { status: 200 });
    } catch (error) {
        console.error('Error deleting data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
