
import i18next from 'i18next'
import FsBackend, { FsBackendOptions } from 'i18next-fs-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { fileURLToPath } from 'url';
import path from 'path';

import enTranslation from './locales/en/translation.json' with { type: 'json' };
import zhTranslation from './locales/zh/translation.json' with { type: 'json' };
import assert from 'assert';

// import all namespaces (for the default language, only)
// import translation from './locales/en/translation.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fsBackend = new FsBackend({
    // path where resources get loaded from
    // loadPath: './locales/{{lng}}/{{ns}}.json'
    loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json')
});

/*
i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'zh'],
    saveMissing: true,
    interpolation: {
      escapeValue: false
    },
    ns: 'translation',
    defaultNS: 'translation',
    debug: true,
    //backend: {
    //  loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json')
    //},
    //backendOptions: [{
    //  loadPath: '/locales/{{lng}}/{{ns}}.json'
    //}]
    resources: {
      en: {
        translation: {
          app_title: 'hello world',
          OpenSpec: {
            cmds: {
              desc: "AI_native system for spec_driven development",
              init: {
                desc: "Initialize OpenSpec in your project",
                options: {
                  force: "Auto_cleanup legacy files without prompting"
                }
              }
            }
          }
        }
      },
      zh: {
          translation: {
              app_title: 'hello world'
          },
          OpenSpec: {
            cmds: {
              desc: "AI_native system for spec_driven development",
              init: {
                desc: "Initialize OpenSpec in your project",
                options: {
                  force: "Auto_cleanup legacy files without prompting"
                }
              }
            }
          }
      },
    }
});
//*/

// loadPath: path.join(__dirname, 'locales/{{lng}}.json')
// loadPath: './locales/{{lng}}.json'
/*
const promise = await i18next.use(FsBackend).init({
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'zh'],
    saveMissing: true,
    interpolation: {
      escapeValue: false
    },
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    backend: {
      loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json')
    },
    //backendOptions: [{
    //  loadPath: '/locales/{{lng}}/{{ns}}.json'
    //}]
});
//*/

/*
// This method can't work.
const promise = await i18next
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'zh'],
    saveMissing: true,
    interpolation: {
      escapeValue: false
    },
    ns: ['translation'],
    defaultNS: 'translation',
    debug: true,
});
//*/

//
// This method can work also, use with: { type: 'json' }.
const promise = await i18next
  .use(resourcesToBackend(async (language: string, namespace: string) => {
      try {
        const module = await import(`./locales/${language}/${namespace}.json`,
          { with: { type: 'json' }
        });
        return module.default;
      } catch (error) {
        console.error(`Failed to load "./locales/${language}/${namespace}.json" translations:`, error);
        return null;
      }
    })
  )
  .init({
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'zh'],
    saveMissing: true,
    interpolation: {
      escapeValue: false
    },
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    //backend: {
    // loadPath: path.join(__dirname, './locales/{{lng}}/{{ns}}.json')
    //},
});
//*/

/*//
const promise = await i18next
  .use(resourcesToBackend(async (language: string, namespace: string) => {
      if (language === 'en' && namespace === 'translation') {
        return enTranslation;
      }
      if (language === 'zh' && namespace === 'translation') {
        return zhTranslation;
      }
      return null;
      })
  )
  .init({
    lng: 'en',
    fallbackLng: 'en',
    preload: ['en', 'zh'],
    saveMissing: true,
    interpolation: {
      escapeValue: false
    },
    ns: ['translation'],
    defaultNS: 'translation',
    debug: true,
    resources: {
      en: { translation: enTranslation },
      zh: { translation: zhTranslation }
    }
});
//*/

i18next.on('failedLoading', (lng, ns, msg) => console.error(msg));

i18next.on('initialized', () => {
  // 设置语言
  // i18next.changeLanguage('en');
  console.log(i18next.t("app_title"));
  console.log('i18next initialized.');
});

// Print blank line, skip the i18next AD text.
console.log("")
// i18next.changeLanguage("en");
// i18next.loadNamespaces("translation");

// console.log("path = ", path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'))
// console.log(i18next.t('app_title'))
// console.log(i18next.t('OpenSpec.cmds.init.desc'))

export default i18next
