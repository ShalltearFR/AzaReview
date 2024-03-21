import { NextResponse } from "next/server";
import type { GitHubCommit } from "@/types/GitHubCommit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    let allCommits: any = [];
    let page = 1;
    let hasMoreCommits = true;

    // Pagination à travers les résultats des commits
    while (hasMoreCommits) {
      const res = await fetch(
        `https://api.github.com/repos/ShalltearFR/AzaReview/commits?page=${page}&per_page=100`
      );
      const json = await res.json();

      // Ajouter les commits de la page actuelle à la liste complète
      allCommits = allCommits.concat(json);

      // Vérifier s'il y a plus de commits à récupérer
      if (json.length === 0) {
        hasMoreCommits = false;
      } else {
        page++;
      }
    }

    // Filtrer et formatter les données des commits
    const data = allCommits
      .map((el: GitHubCommit) => {
        if (!el.commit.message.includes("Merge branch 'main'")) {
          return {
            date: el.commit.author.date,
            message: el.commit.message,
          };
        } else return null;
      })
      .filter((el: any) => el !== null);

    // Regrouper les commits par jour-mois
    const dataFiltered = data.reduce((acc: any, item: any) => {
      const date = new Date(item.date);
      const dayMonth = `${date.getMonth() + 1}-${date.getDate()}`; // Format "jour-mois"

      acc[dayMonth] = acc[dayMonth] || { date: date, message: [] };
      acc[dayMonth].message.push(item.message);

      return acc;
    }, {});

    const dataFilteredToObject = Object.values(dataFiltered);

    if (data) {
      return NextResponse.json(
        { status: 200, data: dataFilteredToObject },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true });
  }
}
