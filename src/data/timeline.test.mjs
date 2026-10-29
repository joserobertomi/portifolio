import assert from "node:assert/strict";
import test from "node:test";

import { filterTimeline, timeline } from "./timeline.ts";

test("Tudo includes the complete journey in its original order", () => {
  assert.deepEqual(filterTimeline("Tudo"), timeline);
});

const expectedTitles = {
  Experiência: [
    "Mentoria em inteligência artificial",
    "Engenharia de software na SADI",
    "Produtos e projetos de inovação",
    "Automações e desenvolvimento web",
  ],
  Pesquisa: [
    "Pesquisador voluntário",
    "Pesquisa em inteligência artificial",
    "Um veículo autônomo para aprender construindo",
    "Primeiros passos na pesquisa em IA",
  ],
  Formação: [
    "Inovação em uma equipe multidisciplinar",
    "Ciência da Computação",
  ],
  Conquistas: [
    "Prata nacional na Olimpíada Brasileira de Robótica",
    "Robótica, programação e a primeira conquista em equipe",
  ],
};

for (const [category, titles] of Object.entries(expectedTitles)) {
  test(`${category} contains only its events, newest first`, () => {
    assert.deepEqual(
      filterTimeline(category).map((event) => event.title),
      titles,
    );
  });
}
