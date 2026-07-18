export type PaperStatus = "current" | "complete";

export interface Paper {
  slug: string;
  title: string;
  partner: string;
  dates: string;
  status: PaperStatus;
  abstract: string;
  externalUrl?: string;
}

/**
 * Single source of truth for every research paper referenced anywhere on the
 * site (homepage Research accordion, Engineering page paired research cards).
 * A paper with no `externalUrl` is expected to have a matching PDF at
 * /private/research/<slug>.pdf, served view-only via /api/research/<slug>
 * (see private/research/README.md).
 */
export const PAPERS: Paper[] = [
  {
    slug: "democratization-decarbonization-ai",
    title: "Democratization and Decarbonization of AI Solutions",
    partner: "In association with the Bevisioneers Mercedes-Benz Program",
    dates: "May 2024 to Present",
    status: "current",
    abstract:
      "This paper addresses two crucial challenges: the failure of many AI solutions to reach their intended users due to poor accessibility, and the significant environmental toll of AI development. Despite the transformative potential of AI, much of its promise remains unrealized for those who need it most, as deployment practices often overlook inclusivity. At the same time, data centers, which power AI, consume vast amounts of energy and clean water, contributing heavily to carbon emissions and resource depletion. To tackle both issues, this paper advocates for greener AI technologies to reduce their environmental footprint and explores edge computing as a key solution. By performing AI inference closer to the data source, edge computing not only cuts down on energy consumption but also enhances accessibility, ensuring that AI's benefits reach broader and more diverse communities. Both democratization and decarbonization are vital for ensuring AI solutions are impactful, sustainable, and equitably distributed.",
  },
  {
    slug: "ai-enabled-regulation",
    title: "AI-Enabled Regulation as a Means to Digital Safety",
    partner: "In association with the African Leadership University",
    dates: "Aug 2023 to Apr 2024",
    status: "complete",
    abstract:
      "An in-depth research to establish the effectiveness of current social media regulation technical and legal measures. The weaknesses emerging inform the proposed strategy of real-time detection and alleviation, and pre-interaction AI assisted strategies. The paper concludes with the development of an AI-powered Chrome Extension that actively listens, evaluates, and controls information flow on social media.",
    externalUrl: "https://alu.librarika.com/search?author_id=7008456",
  },
  {
    slug: "cross-border-data-transfer",
    title: "Analyzing Inefficiencies in Current Cross-Border Data Transfer Laws",
    partner: "In association with Africa Nazarene University",
    dates: "Jan to Nov 2022",
    status: "complete",
    abstract:
      "This paper examines the current legal framework governing cross-border data transfers, focusing on key regulations such as the GDPR, DPA, and other relevant legal instruments. It explores the dynamic nature of data transfer, driven by evolving digital and business needs, including data usage for AI research and training, software-shared data, and the extensive data collection practices of companies like WorldCoin. The analysis also considers how long data is stored beyond its primary purpose. Critical factors such as time, purpose, duration, type, and licensing are pivotal to this research. Finally, the paper proposes recommendations for improving legal efficiencies and highlights existing frameworks that could be adapted to strengthen data transfer regulations.",
  },
  {
    slug: "unbiased-hiring-algorithms",
    title: "Unbiased Hiring Algorithms",
    partner: "In association with the United Nations Academic Impact",
    dates: "Aug to Dec 2021",
    status: "complete",
    abstract:
      "As organizations increasingly adopt automated solutions, many are turning to AI for hiring processes. While this approach simplifies recruitment and is seen as reducing human bias, algorithmic discrimination remains a significant concern, potentially leading to unfair outcomes and legal liabilities. This research aims to develop an effective tool that addresses discriminatory elements while maintaining efficiency, ensuring a more equitable and compliant hiring process.",
    externalUrl: "https://www.millenniumfellows.org/fellow/2021/alu/decra-kerubo-mokorah",
  },
];
