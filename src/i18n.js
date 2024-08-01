import { createI18n } from 'vue-i18n'
import { usePathStore } from './stores/path'

// Pinia store'unu kullanmadan önce, uygulamanın oluşturulmuş olması gerekiyor.
// Bu nedenle, i18n oluşturma işlemini bir fonksiyon içine alacağız.

const messages = {
  en: {
    personal: {
      title: "Software Engineer",
    },
    nav: {
      home: 'Home',
      openSourceProjects: 'Open Source Projects',
      professionalProjects: 'Professional Projects',
      language: 'Language'
    },
    terminal: {
      welcomeText: 'Welcome to the simulated Linux terminal! Type "help" to see available commands.',
      availableCommands: {
        title: 'Available commands:',
        cd: 'cd [directory] - Change directory',
        ls: 'ls - List contents of current directory',
        clear:  'clear or cls - Clear the terminal',
        help: 'help - Show this help message',
        ipconfig: 'ipconfig - Show IP address',
        echo: 'echo [message] - Display a message',
        downloadCv: 'download-cv - Download Mustafa Kendigüzel cv copy',
        changeLanguage: 'change-language [language] - Change the language of the terminal (en, tr)',
      },

      commandNotFound: 'Command not found'
    },
    projects: {
      professional:{
        Medionam: {
          description: 'MediOnam is a cloud-based platform designed to streamline and modernize the process of obtaining, storing, and verifying patient consent in the medical field. The project leverages cloud technologies to securely store consent forms, making them easily accessible to doctors while ensuring compliance with legal requirements.',
        },
        'Eyedius-one': {
          description: 'Eyedius One is a mobile application that leverages camera analytics and advanced image processing algorithms to provide users with detailed statistical insights. These insights include metrics such as the frequency of appearances, which cameras capture them the most, and the times they are most often on camera. The application also offers a customizable user interface, allowing users to personalize their experience through widgets or cards that display relevant data and functionalities tailored to their needs.',
        },
        Meetnutcracker: {
          description: "Nutcracker is a parental control platform designed to help parents manage their children's digital experiences. It offers AI-supported tools to monitor online activities, filter inappropriate content, prevent cyberbullying, and balance online and offline engagement. Parents can track device usage, review their children's content interactions, and receive tailored recommendations for managing screen time and encouraging healthier digital habits. Nutcracker aims to protect children from online risks while promoting a balanced lifestyle."
        },
      },
      openSource: {
        EventTagger: {
          description: 'EventTagger, is an innovative event management application that allows users to create events and upload profile photos. The standout feature of our app is the ability to automatically tag users in event photos using advanced facial recognition technology.'
        }
      }

    },
    store: 'Store'
  },
  tr: {
    personal: {
      title: "Yazılım Mühendisi",
    },
    nav: {
      home: 'Ana Sayfa',
      openSourceProjects: 'Açık Kaynak Projeler',
      professionalProjects: 'Profesyonel Projeler',
      language: 'Dil'
    },
    terminal: {
      welcomeText: 'Simüle edilmiş Linux terminaline hoş geldiniz! Mevcut komutları görmek için "help" yazın.',
      availableCommands: {
        title: 'Kullanılabilir komutlar:',
        cd: 'cd [dizin] - Dizini değiştir',
        ls: 'ls - Geçerli dizinin içeriğini listele',
        clear: 'clear veya cls - Terminali temizle',
        help: 'help - Bu yardım mesajını göster',
        ipconfig: 'ipconfig - IP adresini göster',
        echo: 'echo [mesaj] - Bir mesaj görüntüleyin',
        downloadCv: 'download-cv - Mustafa Kendigüzel cv kopyasını indir',
        changeLanguage: 'change-language [dil] - Terminalin dilini değiştirin (en, tr)',
      },
      commandNotFound: 'Komut bulunamadı',
    },
    projects: {
      professional: {
        Medionam: {
          description: 'MediOnam, tıp alanında hasta onayı alma, saklama ve doğrulama sürecini kolaylaştırmak ve modernize etmek için tasarlanmış bulut tabanlı bir platformdur. Proje, onay formlarını güvenli bir şekilde saklamak için bulut teknolojilerinden yararlanmakta, yasal gerekliliklere uygunluğu sağlarken doktorlar tarafından kolayca erişilebilir hale getirmektedir.',
        },
        'Eyedius-one': {
          description: "Eyedius One, kullanıcılara ayrıntılı istatistiksel bilgiler sağlamak için kamera analizlerinden ve gelişmiş görüntü işleme algoritmalarından yararlanan bir mobil uygulamadır. Bu bilgiler arasında görünme sıklığı, hangi kameraların onları en çok yakaladığı ve en sık kamerada oldukları zamanlar gibi metrikler yer almaktadır. Uygulama ayrıca özelleştirilebilir bir kullanıcı arayüzü sunarak, kullanıcıların ihtiyaçlarına göre uyarlanmış ilgili verileri ve işlevleri görüntüleyen widget'lar veya kartlar aracılığıyla deneyimlerini kişiselleştirmelerine olanak tanır.",
        },
        Meetnutcracker: {
          description: "Nutcracker, ebeveynlerin çocuklarının dijital deneyimlerini yönetmelerine yardımcı olmak için tasarlanmış bir ebeveyn kontrol platformudur. Çevrimiçi etkinlikleri izlemek, uygunsuz içeriği filtrelemek, siber zorbalığı önlemek ve çevrimiçi ve çevrimdışı etkileşimi dengelemek için yapay zeka destekli araçlar sunar. Ebeveynler cihaz kullanımını takip edebilir, çocuklarının içerik etkileşimlerini inceleyebilir ve ekran süresini yönetmek ve daha sağlıklı dijital alışkanlıkları teşvik etmek için özel öneriler alabilir. Nutcracker, dengeli bir yaşam tarzını teşvik ederken çocukları çevrimiçi risklerden korumayı amaçlamaktadır."
        }
      }
,
      openSource: {
        EventTagger: {
          description: 'EventTagger, kullanıcıların etkinlik oluşturmasına ve profil fotoğrafları yüklemesine olanak tanıyan yenilikçi bir etkinlik yönetimi uygulamasıdır. Uygulamamızın öne çıkan özelliği, gelişmiş yüz tanıma teknolojisini kullanarak kullanıcıları etkinlik fotoğraflarında otomatik olarak etiketleyebilmesidir.'
        }
      }
    },
    store: 'Mağaza'

  },
}

export function createI18nInstance() {
  const pathStore = usePathStore()
  return createI18n({
    legacy: false,
    locale: pathStore.$state.localeLang, 
    fallbackLocale: pathStore.localeLang,
    messages,
  })
}