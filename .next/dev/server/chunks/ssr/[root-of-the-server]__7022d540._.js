module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/i18n.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const translations = {
    fr: {
        app: {
            title: "Gestion des Élections",
            subtitle: "Système de gestion des élections présidentielles"
        },
        auth: {
            signin: "Connexion",
            signup: "Inscription",
            logout: "Déconnexion",
            error: "Erreur lors de l'authentification",
            noAccount: "Pas encore de compte ?",
            haveAccount: "Vous avez déjà un compte ?"
        },
        form: {
            email: "Email",
            password: "Mot de passe",
            name: "Nom complet",
            oldPassword: "Mot de passe actuel",
            newPassword: "Nouveau mot de passe",
            confirmPassword: "Confirmation du mot de passe"
        },
        nav: {
            table: "Tableau de bord",
            reports: "Rapports",
            results: "Résultats",
            candidates: "Candidats",
            elections: "Élections",
            locations: "Localisations",
            users: "Utilisateurs"
        },
        dashboard: {
            welcome: "Bienvenue",
            subtitle: "Tableau de bord de gestion des élections"
        },
        quick: {
            actions: "Actions rapides"
        },
        geographic: {
            management: "Gestion géographique"
        },
        administrative: {
            hierarchy: "Wilayas, moughataas, communes..."
        },
        candidates: {
            management: "Gestion des candidats",
            title: "Candidats",
            subtitle: "Gérer les candidats",
            registered: "Candidats enregistrés"
        },
        presidential: {
            candidates: "Liste des candidats présidentiels",
            election: "Élection présidentielle"
        },
        elections: {
            title: "Élections",
            subtitle: "Gérer les élections"
        },
        locations: {
            title: "Lieux de vote",
            subtitle: "Gérer les wilayas, communes et bureaux",
            structure: "Structure des localités",
            detail: "Détail de la localité",
            hint: "Cliquez pour afficher les détails de la structure"
        },
        results: {
            title: "Résultats",
            subtitle: "Consulter les résultats électoraux",
            management: "Consultation et contrôle des résultats",
            formTitle: "Saisir les résultats",
            formSubtitle: "Sélectionnez un bureau puis entrez les voix de chaque candidat.",
            votersCount: "Nombre de votants",
            selectBureau: "Sélectionnez un bureau",
            wilayaRestriction: "Vous ne pouvez saisir que pour votre wilaya.",
            saved: "Résultats enregistrés ✅",
            saveError: "Erreur lors de la sauvegarde ❌",
            networkError: "Erreur réseau ❌",
            saving: "Enregistrement...",
            by: {
                candidate: "Résultats par candidat"
            },
            noData: "Aucun résultat disponible pour l’instant.",
            noAccess: "Accès refusé",
            guestNoAccess: "Votre profil invité ne permet pas de saisir des résultats."
        },
        votes: {
            distribution: "Répartition des voix",
            count: "Nombre de voix"
        },
        reports: {
            title: "Rapports",
            subtitle: "Générer des rapports et analyses",
            statistics: "Rapports & statistiques"
        },
        electoral: {
            results: "Résultats électoraux",
            data: {
                analysis: "Analyse des données électorales"
            }
        },
        roles: {
            admin: "Administrateur",
            operator: "Opérateur",
            guest: "Invité"
        },
        election: {
            date: "Date de l’élection"
        },
        total: {
            voters: "Total inscrits",
            bureaux: "Bureaux de vote",
            candidates: "Candidats",
            votants: "Votants",
            wilayas: "Total wilayas"
        },
        registered: {
            voters: "Électeurs inscrits"
        },
        bureauStats: {
            deplouilles: "dépouillés"
        },
        current: {
            level: "Niveau actuel",
            rate: "Actuel"
        },
        select: {
            geographic: {
                level: "Sélectionnez un niveau géographique"
            },
            wilaya: "Sélectionnez une wilaya",
            moughataa: "Sélectionnez une moughataa",
            commune: "Sélectionnez une commune",
            centre: "Sélectionnez un centre",
            bureau: "Sélectionnez un bureau"
        },
        // niveaux
        wilaya: "Wilaya",
        moughataa: "Moughataa",
        commune: "Commune",
        centre: "Centre",
        bureau: "Bureau",
        national: "National",
        moughataas: "Moughataas",
        communes: "Communes",
        centres: "Centres",
        bureaux: "Bureaux",
        vote: "voix",
        common: {
            loading: "Chargement...",
            save: "Enregistrer",
            cancel: "Annuler",
            delete: "Supprimer",
            edit: "Modifier",
            add: "Ajouter",
            french: "Français",
            arabic: "Arabe",
            logout: "Déconnexion",
            vote: "voix",
            export: {
                pdf: "Exporter PDF"
            }
        },
        filter: {
            results: "Filtrer les résultats"
        },
        neutral: {
            votes: "Votes neutres"
        },
        rejected: {
            votes: "Votes rejetés"
        },
        participation: {
            rate: "Taux de participation"
        },
        in: {
            progress: "En cours"
        },
        password: {
            changeTitle: "Changer votre mot de passe",
            changeDescription: "Pour continuer, vous devez créer un nouveau mot de passe.",
            tooShort: "Le mot de passe doit contenir au moins 6 caractères.",
            matchError: "Les mots de passe ne correspondent pas.",
            error: "Erreur lors du changement de mot de passe.",
            submit: "Valider"
        },
        users: {
            title: "Gestion des utilisateurs",
            subtitle: "Créer, modifier et gérer les accès",
            resetPassword: "Réinitialiser le mot de passe",
            tempPassword: "Mot de passe temporaire",
            actions: "Actions",
            user: "Utilisateur",
            role: "Rôle",
            wilaya: "Wilaya"
        }
    },
    // ------------------------------------------------------
    // ---------------------- ARABE --------------------------
    // ------------------------------------------------------
    ar: {
        app: {
            title: "إدارة الانتخابات",
            subtitle: "نظام إدارة الانتخابات الرئاسية"
        },
        auth: {
            signin: "تسجيل دخول",
            signup: "إنشاء حساب",
            logout: "تسجيل خروج",
            error: "خطأ في المصادقة",
            noAccount: "ليس لديك حساب؟",
            haveAccount: "هل لديك حساب بالفعل؟"
        },
        form: {
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            name: "الاسم الكامل",
            oldPassword: "كلمة المرور الحالية",
            newPassword: "كلمة المرور الجديدة",
            confirmPassword: "تأكيد كلمة المرور"
        },
        nav: {
            table: "لوحة التحكم",
            reports: "التقارير",
            results: "النتائج",
            candidates: "المرشحون",
            elections: "الانتخابات",
            locations: "المواقع",
            users: "المستخدمون"
        },
        dashboard: {
            welcome: "مرحبا",
            subtitle: "لوحة تحكم إدارة الانتخابات"
        },
        quick: {
            actions: "إجراءات سريعة"
        },
        geographic: {
            management: "الإدارة الجغرافية"
        },
        administrative: {
            hierarchy: "الولايات، المقاطعات، البلديات..."
        },
        candidates: {
            management: "إدارة المرشحين",
            title: "المرشحون",
            subtitle: "إدارة المرشحين",
            registered: "المرشحون المسجلون"
        },
        presidential: {
            candidates: "قائمة المرشحين للرئاسة",
            election: "الانتخابات الرئاسية"
        },
        elections: {
            title: "الانتخابات",
            subtitle: "إدارة الانتخابات"
        },
        locations: {
            title: "مراكز الاقتراع",
            subtitle: "إدارة الولايات والبلديات والمكاتب",
            structure: "هيكل المواقع",
            detail: "تفاصيل الموقع",
            hint: "اضغط لعرض تفاصيل الهيكل"
        },
        results: {
            title: "النتائج",
            subtitle: "عرض النتائج الانتخابية",
            management: "عرض وإدارة النتائج",
            formTitle: "إدخال النتائج",
            formSubtitle: "اختر مكتب التصويت ثم أدخل أصوات كل مرشح.",
            votersCount: "عدد المصوتين",
            selectBureau: "اختر مكتباً",
            wilayaRestriction: "لا يمكنك الإدخال إلا في ولايتك.",
            saved: "تم حفظ النتائج بنجاح ✅",
            saveError: "خطأ أثناء الحفظ ❌",
            networkError: "خطأ في الاتصال ❌",
            saving: "جاري الحفظ...",
            by: {
                candidate: "نتائج حسب المرشح"
            },
            noData: "لا توجد بيانات متاحة حاليا.",
            noAccess: "دخول مرفوض",
            guestNoAccess: "حساب الضيف لا يسمح بإدخال النتائج."
        },
        votes: {
            distribution: "توزيع الأصوات",
            count: "عدد الأصوات"
        },
        reports: {
            title: "التقارير",
            subtitle: "إنشاء التقارير والتحليلات",
            statistics: "التقارير والإحصائيات"
        },
        electoral: {
            results: "النتائج الانتخابية",
            data: {
                analysis: "تحليل البيانات الانتخابية"
            }
        },
        roles: {
            admin: "مسؤول",
            operator: "مشغل",
            guest: "ضيف"
        },
        election: {
            date: "تاريخ الانتخابات"
        },
        total: {
            voters: "إجمالي المسجلين",
            bureaux: "مكاتب التصويت",
            candidates: "المرشحون",
            votants: "إجمالي المصوتين",
            wilayas: "إجمالي الولايات"
        },
        registered: {
            voters: "الناخبون المسجلون"
        },
        bureauStats: {
            deplouilles: "مُفرَزة"
        },
        current: {
            level: "المستوى الحالي",
            rate: "الحالي"
        },
        select: {
            geographic: {
                level: "اختر المستوى الجغرافي"
            },
            wilaya: "اختر الولاية",
            moughataa: "اختر المقاطعة",
            commune: "اختر البلدية",
            centre: "اختر المركز",
            bureau: "اختر المكتب"
        },
        national: "وطني",
        wilaya: "ولاية",
        moughataa: "مقاطعة",
        commune: "بلدية",
        centre: "مركز",
        bureau: "مكتب",
        moughataas: "مقاطعات",
        communes: "بلديات",
        centres: "مراكز",
        bureaux: "مكاتب",
        vote: "صوت",
        common: {
            loading: "جاري التحميل...",
            save: "حفظ",
            cancel: "إلغاء",
            delete: "حذف",
            edit: "تعديل",
            add: "إضافة",
            french: "الفرنسية",
            arabic: "العربية",
            logout: "تسجيل الخروج",
            vote: "صوت",
            export: {
                pdf: "تصدير PDF"
            }
        },
        filter: {
            results: "تصفية النتائج"
        },
        neutral: {
            votes: "الأصوات المحايدة"
        },
        rejected: {
            votes: "الأصوات المرفوضة"
        },
        participation: {
            rate: "نسبة المشاركة"
        },
        in: {
            progress: "قيد التنفيذ"
        },
        password: {
            changeTitle: "تغيير كلمة المرور",
            changeDescription: "للمتابعة، يجب عليك إنشاء كلمة مرور جديدة.",
            tooShort: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.",
            matchError: "كلمتا المرور غير متطابقتين.",
            error: "حدث خطأ أثناء تغيير كلمة المرور.",
            submit: "تأكيد"
        },
        users: {
            title: "إدارة المستخدمين",
            subtitle: "إنشاء وتعديل وإدارة الصلاحيات",
            resetPassword: "إعادة تعيين كلمة المرور",
            tempPassword: "كلمة المرور المؤقتة",
            actions: "الإجراءات",
            user: "مستخدم",
            role: "الدور",
            wilaya: "الولاية"
        }
    }
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('fr');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('language');
        if (saved) {
            setLanguageState(saved);
        }
        setMounted(true);
        document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = saved || 'fr';
    }, []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };
    const t = (key, defaultValue = '')=>{
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys){
            value = value?.[k];
        }
        return value || defaultValue || key;
    };
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/i18n.tsx",
        lineNumber: 518,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7022d540._.js.map