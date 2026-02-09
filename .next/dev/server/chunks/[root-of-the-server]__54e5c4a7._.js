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
"[project]/app/api/geo/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        const lang = searchParams.get("lang") || "fr";
        const isArabic = lang === "ar";
        const wilayas = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].wilaya.findMany({
            include: {
                moughataas: {
                    include: {
                        communes: {
                            include: {
                                centres: {
                                    include: {
                                        bureaux: {
                                            include: {
                                                resultats: {
                                                    include: {
                                                        candidat: true,
                                                        electionType: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                nom_fr: "asc"
            }
        });
        const wilayasWithStats = wilayas.map((w)=>{
            const moughataas = Array.isArray(w.moughataas) ? w.moughataas : [];
            const mappedMoughataas = moughataas.map((m)=>{
                const communes = Array.isArray(m.communes) ? m.communes : [];
                const mappedCommunes = communes.map((c)=>{
                    const centres = Array.isArray(c.centres) ? c.centres : [];
                    const mappedCentres = centres.map((ctr)=>{
                        const bureaux = Array.isArray(ctr.bureaux) ? ctr.bureaux : [];
                        const mappedBureaux = bureaux.map((b)=>{
                            const resultats = Array.isArray(b.resultats) ? b.resultats : [];
                            const totalInscrits = b.nombreInscrits ?? 0;
                            const totalVotants = b.nombreVotants ?? 0;
                            return {
                                id: b.id,
                                nom: isArabic ? b.nom_ar : b.nom_fr,
                                totalInscrits,
                                totalVotants,
                                tauxParticipation: totalInscrits > 0 ? Math.round(totalVotants / totalInscrits * 10000) / 100 : 0,
                                resultats: resultats.map((r)=>({
                                        id: r.id,
                                        candidatId: r.candidatId,
                                        candidatNom: isArabic ? r.candidat.nom_ar : r.candidat.nom_fr,
                                        candidatCouleur: r.candidat.couleur,
                                        candidatLogo: r.candidat.logo,
                                        nombreVoix: r.nombreVoix ?? 0,
                                        voixNuls: r.voixNuls ?? 0,
                                        voixRejetes: r.voixRejetes ?? 0,
                                        electionType: isArabic ? r.electionType.nom_ar : r.electionType.nom_fr
                                    }))
                            };
                        });
                        const totalInscrits = mappedBureaux.reduce((s, x)=>s + x.totalInscrits, 0);
                        const totalVotants = mappedBureaux.reduce((s, x)=>s + x.totalVotants, 0);
                        return {
                            id: ctr.id,
                            nom: isArabic ? ctr.nom_ar : ctr.nom_fr,
                            bureaux: mappedBureaux,
                            totalInscrits,
                            totalVotants,
                            tauxParticipation: totalInscrits > 0 ? Math.round(totalVotants / totalInscrits * 10000) / 100 : 0
                        };
                    });
                    const totalInscrits = mappedCentres.reduce((s, x)=>s + x.totalInscrits, 0);
                    const totalVotants = mappedCentres.reduce((s, x)=>s + x.totalVotants, 0);
                    return {
                        id: c.id,
                        nom: isArabic ? c.nom_ar : c.nom_fr,
                        centres: mappedCentres,
                        totalInscrits,
                        totalVotants,
                        tauxParticipation: totalInscrits > 0 ? Math.round(totalVotants / totalInscrits * 10000) / 100 : 0
                    };
                });
                const totalInscrits = mappedCommunes.reduce((s, x)=>s + x.totalInscrits, 0);
                const totalVotants = mappedCommunes.reduce((s, x)=>s + x.totalVotants, 0);
                return {
                    id: m.id,
                    nom: isArabic ? m.nom_ar : m.nom_fr,
                    communes: mappedCommunes,
                    totalInscrits,
                    totalVotants,
                    tauxParticipation: totalInscrits > 0 ? Math.round(totalVotants / totalInscrits * 10000) / 100 : 0
                };
            });
            const totalInscrits = mappedMoughataas.reduce((s, x)=>s + x.totalInscrits, 0);
            const totalVotants = mappedMoughataas.reduce((s, x)=>s + x.totalVotants, 0);
            return {
                id: w.id,
                nom: isArabic ? w.nom_ar : w.nom_fr,
                moughataas: mappedMoughataas,
                totalInscrits,
                totalVotants,
                tauxParticipation: totalInscrits > 0 ? Math.round(totalVotants / totalInscrits * 10000) / 100 : 0
            };
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(wilayasWithStats);
    } catch (error) {
        console.error("Erreur chargement géographie:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur de chargement des données"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__54e5c4a7._.js.map