import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          routes: {
            movie_search: "Movie search",
            info: "About",
            list: "My list",
            config: "Settings",
          },
          movie_search: {
            placeholder: "Enter a movie name...",
            feedback: "Nothing was found, try again",
            no_image: "No image avaliable",
          },
          list: {
            overview: "Your list is currently empty",
            not_avaliable: "Overview not avaliable",
            load: "Loading...",
          },
          info: {
            no_genres: "No genres provided",
            director: "Directed by: ",
            no_director: "Director not found",
            no_overview: "Overview not avaliable",
            no_image: "No image avaliable",
            runtime: "Duration: ",
            button_plus: "Add to my list",
            button_minus: "Remove from my list",
            error_get: "Failed to get list",
            error_add: "Failed to add to list",
            error_message: "Please, try again",
          },
          settings: {
            lang: "Language",
          },
        },
      },
      pt_br: {
        translation: {
          routes: {
            movie_search: "Pesquisar filmes",
            info: "Sobre",
            list: "Minha lista",
            config: "Configurações",
          },
          movie_search: {
            placeholder: "Insira o nome de um filme...",
            feedback: "Nada foi encontrado, tente novamente",
            no_image: "Imagem indisponível",
          },
          list: {
            overview: "Sua lista está vazia",
            not_avaliable: "Sinopse não disponível",
            load: "Carregando...",
          },
          info: {
            no_genres: "Nenhum gênero provido",
            director: "Dirigido por: ",
            no_director: "Diretor não encontrado",
            no_overview: "Sinopse não disponível",
            no_image: "Imagem indisponível",
            runtime: "Duração: ",
            button_plus: "Adicionar a minha lista",
            button_minus: "Remover da minha lista",
            error_get: "Erro ao carregar lista",
            error_add: "Erro ao adicionar à lista",
            error_message: "Por favor, tente novamente",
          },
          settings: {
            lang: "Idioma",
          },
        },
      },
    },
  });

export default i18n;
