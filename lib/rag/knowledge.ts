/**
 * Knowledge base for RAG - Middle East aviation context
 */

export const KNOWLEDGE_DOCS = [
  {
    id: "me-airports",
    content: `Middle East major hubs: Dubai (OMDB/DXB), Doha (OTBD/DOH), Abu Dhabi (OMAA/AUH), 
    Riyadh (OERK/RUH), Jeddah (OEJN/JED), Istanbul (LTFM/IST), Tehran (OIIE/IKA), 
    Tel Aviv (LLBG/TLV), Amman (OJAM/AMM), Kuwait (OKBK/KWI), Bahrain (OBBI/BAH), 
    Muscat (OOMS/MCT). Dubai and Doha are primary transit hubs for Asia-Europe traffic.`,
  },
  {
    id: "me-routes",
    content: `Key corridors: Europe-Gulf (via Turkey/Iran), Asia-Africa via Gulf, 
    Intra-Gulf shuttle traffic. Major airlines: Emirates, Qatar Airways, Etihad, 
    Saudi Airlines, Turkish Airlines, Iran Air. Gulf carriers dominate long-haul 
    connectivity. Seasonal peaks: Ramadan, Hajj, summer tourism.`,
  },
  {
    id: "me-operations",
    content: `Regional challenges: airspace restrictions (Yemen, Syria, Iraq), 
    slot constraints at DXB/DOH, weather (sandstorms, summer heat), overflight fees. 
    Growth areas: Saudi Vision 2030 aviation expansion, Qatar World Cup legacy, 
    UAE-Egypt-Israel normalization opening new routes.`,
  },
  {
    id: "me-insights",
    content: `Traffic patterns: peaks 06-09 UTC and 18-22 UTC. Cargo heavy on 
    Asia-Europe lanes. Military and state aircraft common in conflict-adjacent zones. 
    High density clusters: DXB approach, North Arabian Gulf, Istanbul FIR.`,
  },
];
