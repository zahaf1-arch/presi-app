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
"[project]/lib/services/geographic.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllBureaux",
    ()=>getAllBureaux,
    "getAllCentres",
    ()=>getAllCentres,
    "getAllCommunes",
    ()=>getAllCommunes,
    "getAllMoughataas",
    ()=>getAllMoughataas,
    "getAllWilayas",
    ()=>getAllWilayas,
    "getBureauById",
    ()=>getBureauById,
    "getBureauxByCentre",
    ()=>getBureauxByCentre,
    "getCentreById",
    ()=>getCentreById,
    "getCentresByCommune",
    ()=>getCentresByCommune,
    "getCommuneById",
    ()=>getCommuneById,
    "getCommunesByMoughataa",
    ()=>getCommunesByMoughataa,
    "getMoughataaById",
    ()=>getMoughataaById,
    "getMoughataasByWilaya",
    ()=>getMoughataasByWilaya,
    "getWilayaById",
    ()=>getWilayaById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
;
async function getAllWilayas() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].wilaya.findMany({
        include: {
            _count: {
                select: {
                    moughataas: true
                }
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getWilayaById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].wilaya.findUnique({
        where: {
            id
        },
        include: {
            moughataas: {
                include: {
                    _count: {
                        select: {
                            communes: true
                        }
                    }
                }
            }
        }
    });
}
async function getMoughataasByWilaya(wilayaId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].moughataa.findMany({
        where: {
            wilayaId
        },
        include: {
            _count: {
                select: {
                    communes: true
                }
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getAllMoughataas() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].moughataa.findMany({
        include: {
            wilaya: true,
            _count: {
                select: {
                    communes: true
                }
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getMoughataaById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].moughataa.findUnique({
        where: {
            id
        },
        include: {
            communes: {
                include: {
                    _count: {
                        select: {
                            centres: true
                        }
                    }
                }
            },
            wilaya: true
        }
    });
}
async function getCommunesByMoughataa(moughataaId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].commune.findMany({
        where: {
            moughataaId
        },
        include: {
            _count: {
                select: {
                    centres: true
                }
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getAllCommunes() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].commune.findMany({
        include: {
            moughataa: {
                include: {
                    wilaya: true
                }
            },
            _count: {
                select: {
                    centres: true
                }
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getCommuneById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].commune.findUnique({
        where: {
            id
        },
        include: {
            centres: {
                include: {
                    _count: {
                        select: {
                            bureaux: true
                        }
                    }
                }
            },
            moughataa: {
                include: {
                    wilaya: true
                }
            }
        }
    });
}
async function getAllCentres() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].centre.findMany({
        include: {
            commune: {
                include: {
                    moughataa: {
                        include: {
                            wilaya: true
                        }
                    }
                }
            },
            _count: {
                select: {
                    bureaux: true
                }
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getCentreById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].centre.findUnique({
        where: {
            id
        },
        include: {
            bureaux: true,
            commune: {
                include: {
                    moughataa: {
                        include: {
                            wilaya: true
                        }
                    }
                }
            }
        }
    });
}
async function getCentresByCommune(communeId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].centre.findMany({
        where: {
            communeId
        },
        include: {
            _count: {
                select: {
                    bureaux: true
                }
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getBureauxByCentre(centreId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.findMany({
        where: {
            centreId
        },
        include: {
            resultats: {
                select: {
                    id: true
                } // on n’a besoin que de savoir s’il existe un résultat
            }
        },
        orderBy: {
            nom_fr: "asc"
        }
    });
}
async function getAllBureaux() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.findMany({
        include: {
            centre: {
                include: {
                    commune: {
                        include: {
                            moughataa: {
                                include: {
                                    wilaya: true
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
}
async function getBureauById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].bureau.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            nom_fr: true,
            nombreInscrits: true,
            nombreVotants: true,
            centre: {
                include: {
                    commune: {
                        include: {
                            moughataa: {
                                include: {
                                    wilaya: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}
}),
"[project]/app/api/wilayas/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$geographic$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/geographic.service.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const wilayas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$geographic$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllWilayas"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(wilayas);
    } catch (error) {
        console.error("Error fetching wilayas:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erreur lors de la récupération des wilayas"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a529fa42._.js.map