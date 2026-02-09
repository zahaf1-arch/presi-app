module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: [
        'query'
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/app/api/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const wilayaId = searchParams.get("wilayaId");
        const moughataaId = searchParams.get("moughataaId");
        const communeId = searchParams.get("communeId");
        const centreId = searchParams.get("centreId");
        const bureauId = searchParams.get("bureauId");
        // Construire le filtre dynamique
        let whereBureau = {};
        if (bureauId) whereBureau.id = Number(bureauId);
        else if (centreId) whereBureau.centreId = Number(centreId);
        else if (communeId) whereBureau.centre = {
            communeId: Number(communeId)
        };
        else if (moughataaId) whereBureau.centre = {
            commune: {
                moughataaId: Number(moughataaId)
            }
        };
        else if (wilayaId) whereBureau.centre = {
            commune: {
                moughataa: {
                    wilayaId: Number(wilayaId)
                }
            }
        };
        // Récupération des bureaux filtrés avec tous leurs résultats
        const bureaux = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.findMany({
            where: whereBureau,
            include: {
                resultats: {
                    include: {
                        candidat: true
                    }
                }
            }
        });
        // --- Cas sans filtres : statistiques globales ---
        if (bureaux.length === 0 && !wilayaId && !moughataaId && !communeId && !centreId && !bureauId) {
            const [totalWilayas, totalBureaux, totalCandidats, totalInscritsAgg, totalVotantsAgg, totalVoixAgg] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].wilaya.count(),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.count(),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].candidat.count({
                    where: {
                        actif: true
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.aggregate({
                    _sum: {
                        nombreInscrits: true
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.aggregate({
                    _sum: {
                        nombreVotants: true
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].resultat.aggregate({
                    _sum: {
                        nombreVoix: true
                    }
                })
            ]);
            const bureauxDepouilles = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.count({
                where: {
                    resultats: {
                        some: {}
                    }
                }
            });
            const totalInscrits = totalInscritsAgg._sum.nombreInscrits || 0;
            const totalVotants = totalVotantsAgg._sum.nombreVotants || 0;
            const totalVoix = totalVoixAgg._sum.nombreVoix || 0;
            const participationRate = totalInscrits ? totalVotants / totalInscrits * 100 : 0;
            const pourcentageDepouilles = totalBureaux > 0 ? bureauxDepouilles / totalBureaux * 100 : 0;
            // Résultats par candidat
            const candidatsResults = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].candidat.findMany({
                where: {
                    actif: true
                },
                include: {
                    resultats: true
                }
            });
            const candidatsWithVotes = candidatsResults.map((candidat)=>{
                const totalVoixCandidat = candidat.resultats.reduce((sum, r)=>sum + (r.nombreVoix || 0), 0);
                return {
                    id: candidat.id,
                    nom_fr: candidat.nom_fr,
                    nom_ar: candidat.nom_ar,
                    photo: candidat.photo,
                    logo: candidat.logo,
                    couleur: candidat.couleur,
                    totalVoix: totalVoixCandidat
                };
            }).sort((a, b)=>b.totalVoix - a.totalVoix);
            const totalVoixGlobal = candidatsWithVotes.reduce((sum, c)=>sum + c.totalVoix, 0);
            const candidatsWithPercentages = candidatsWithVotes.map((c)=>({
                    ...c,
                    pourcentage: totalVoixGlobal ? c.totalVoix / totalVoixGlobal * 100 : 0
                }));
            // ✅ Calcul des votes nuls/rejetés : un seul résultat par bureau
            const bureauxAvecResultat = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.findMany({
                include: {
                    resultats: true
                }
            });
            let totalNuls = 0;
            let totalRejetes = 0;
            for (const b of bureauxAvecResultat){
                if (b.resultats.length > 0) {
                    totalNuls += b.resultats[0].voixNuls || 0;
                    totalRejetes += b.resultats[0].voixRejetes || 0;
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                globalStats: {
                    totalWilayas,
                    totalBureaux,
                    totalCandidats,
                    totalInscrits,
                    totalVotants,
                    totalVoix,
                    totalNuls,
                    totalRejetes,
                    bureauxDepouilles,
                    pourcentageDepouilles: Math.round(pourcentageDepouilles * 100) / 100,
                    participationRate: Math.round(participationRate * 100) / 100
                },
                candidatsResults: candidatsWithPercentages
            });
        }
        // --- Cas filtré ---
        let totalInscrits = 0;
        let totalVotants = 0;
        let totalNuls = 0;
        let totalRejetes = 0;
        let totalBureaux = bureaux.length;
        let bureauxDepouilles = 0;
        const candidatsMap = {};
        for (const bureau of bureaux){
            totalInscrits += bureau.nombreInscrits || 0;
            totalVotants += bureau.nombreVotants || 0;
            if (bureau.resultats.length > 0) bureauxDepouilles++;
            // ✅ Nuls/Rejetés : prendre seulement le premier résultat du bureau
            if (bureau.resultats.length > 0) {
                totalNuls += bureau.resultats[0].voixNuls || 0;
                totalRejetes += bureau.resultats[0].voixRejetes || 0;
            }
            // Résultats des candidats
            for (const r of bureau.resultats){
                if (!candidatsMap[r.candidat.id]) {
                    candidatsMap[r.candidat.id] = {
                        id: r.candidat.id,
                        nom_fr: r.candidat.nom_fr,
                        nom_ar: r.candidat.nom_ar,
                        photo: r.candidat.photo,
                        logo: r.candidat.logo,
                        couleur: r.candidat.couleur,
                        totalVoix: 0
                    };
                }
                candidatsMap[r.candidat.id].totalVoix += r.nombreVoix || 0;
            }
        }
        const totalVoix = Object.values(candidatsMap).reduce((sum, c)=>sum + c.totalVoix, 0);
        const candidatsResults = Object.values(candidatsMap).map((c)=>({
                ...c,
                pourcentage: totalVoix > 0 ? c.totalVoix / totalVoix * 100 : 0
            }));
        const totalCandidats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].candidat.count({
            where: {
                actif: true
            }
        });
        const globalStats = {
            totalBureaux,
            bureauxDepouilles,
            pourcentageDepouilles: totalBureaux > 0 ? Math.round(bureauxDepouilles / totalBureaux * 100) : 0,
            totalInscrits,
            totalVotants,
            totalVoix,
            totalNuls,
            totalRejetes,
            participationRate: totalInscrits > 0 ? Math.round(totalVotants / totalInscrits * 100) : 0,
            totalCandidats
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            globalStats,
            candidatsResults
        });
    } catch (error) {
        console.error("Erreur lors du calcul des statistiques:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur lors du calcul des statistiques"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__04684a1c._.js.map