import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      companyName,
      companySize,
      monthlySpend,
      selectedTools
    } = body;

    // CALCULATIONS

    const estimatedSavings =
      Number(monthlySpend) * 0.25;

    const annualSavings =
      estimatedSavings * 12;

    // RECOMMENDATIONS

    const recommendations = [
      "Remove unused AI subscriptions",
      "Consolidate duplicate AI tools",
      "Optimize enterprise licensing",
      "Reduce overlapping AI platforms"
    ];

    // RESPONSE

    return NextResponse.json({

      success: true,

      data: {

        companyName,
        companySize,
        monthlySpend,
        selectedTools,

        estimatedSavings,
        annualSavings,

        recommendations

      }

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,
      message: "API failed"

    });

  }

}