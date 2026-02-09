(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/i18n.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
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
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('fr');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const saved = localStorage.getItem('language');
            if (saved) {
                setLanguageState(saved);
            }
            setMounted(true);
            document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = saved || 'fr';
        }
    }["LanguageProvider.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
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
_s(LanguageProvider, "L//wyfeuYGhN2L9Mn2Ur8owkAYE=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_96481b45._.js.map