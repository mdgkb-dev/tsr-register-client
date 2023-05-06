<template>
  <div class="select-block">
    <Button
      width="100%"
      height="60px"
      font-size="16px"
      border-radius="5px"
      color="#00B5A4"
      background="#C7ECEA"
      @click="toggleAddAllergen"
    >
      <template #icon>
        <svg class="icon-plus">
          <use xlink:href="#plus"></use>
        </svg>
      </template>
    </Button>
    <div class="item-list">
      <div class="item-line">
        <div class="left">
          <div class="item-counter">
            <NumberProp v-if="question.valueType.isNumber()" :research-result="researchResult" :question="question" />
          </div>
          <div class="item-name">Подорожник ланцетовидный w9</div>
        </div>
        <div class="button">
          <Button
            text="Удалить"
            width="100%"
            height="40px"
            font-size="16px"
            border-radius="5px"
            color="#B0A4C0"
            background="#ffffff"
            :withIcon="false"
            :colorSwap="true"
          >
          </Button>
        </div>
      </div>

      <div class="item-line">
        <div class="left">
          <div class="item-counter">
            <NumberProp v-if="question.valueType.isNumber()" :research-result="researchResult" :question="question" />
          </div>
          <div class="item-name">Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica).</div>
        </div>
        <div class="button">
          <Button
            text="Удалить"
            width="100%"
            height="40px"
            font-size="16px"
            border-radius="5px"
            color="#B0A4C0"
            background="#ffffff"
            :withIcon="false"
            :colorSwap="true"
          >
          </Button>
        </div>
      </div>
    </div>
    <div v-if="addAllergen" class="blur"></div>
    <div v-if="addAllergen" class="select-form">
      <ResearcheContainer background="#ffffff" padding="0px">
        <template #header>
          <div class="header-block">
            <div class="researche-title">
              <Button
                text="Назад"
                background="#ffffff"
                margin-right="10px"
                height="42px"
                font-size="16px"
                border-radius="5px"
                color="#343e5c"
                @click="toggleAddAllergen"
              >
                <template #icon>
                  <svg class="icon-back">
                    <use xlink:href="#back"></use>
                  </svg>
                </template>
              </Button>
              <div class="researche-name">Выберите аллергены из списка</div>
            </div>
            <GridContainer max-width="600px" grid-gap="6px" grid-template-columns="repeat(auto-fit, minmax(60px, 1fr))" margin="10px 0">
              <template #grid-items>
                <AlphabetFilter />
              </template>
            </GridContainer>
            <RemoteSearch
              :must-be-translated="true"
              key-value="representative"
              placeholder="Начните вводить название диагноза"
              @select="addRepresentative"
            />
          </div>
        </template>

        <template #body>
          <div class="body">
          <GridContainer grid-gap="5px" margin="10px 0" >
            <template #grid-items>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Подорожник ланцетовидный w9"
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Кональбумин куриного яйца, nGa1 d 3, f323 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Береза бородавчатая, rBet v 1 PR-10, t215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p1, g205  "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Смесь компонентов домашней пыли hx2 (h2 Hollister-Stier labs, d1 Dermatophagoides pteronyssinus, d2 Dermatophagoides farinae, i6 Blatella germanica)."
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Латекс, rHev b5, k218 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Тимофеевка луговая, rPh1 p5 b, g215 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Микроорганизм Altemaria alternata, rAlt a 1, m229 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Рыба (треска) f3."
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца клена ясенелистного t1 "
                  background="#DFF2F8"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Пыльца эвкалипта t18 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
                <Button
                  text="Клещ домашней пыли Dermatophagoides microceras d3 "
                  background="#ffffff"
                  margin-right="10px"
                  height="42px"
                  width="100%"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :withIcon="false"
                >
                </Button>
            </template>
          </GridContainer>
          </div>
        </template>
      </ResearcheContainer>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import GeneralItem from '@/components/admin/Patients/GeneralItem.vue';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import Button from '@/components/Base/Button.vue';
import ResearcheContainer from '@/components/admin/Patients/ResearcheContainer.vue';
import AlphabetFilter from '@/components/admin/Patients/AlphabetFilter.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';

export default defineComponent({
  name: 'SetSelect',
  components: {
    GridContainer,
    GeneralItem,
    Button,
    ResearcheContainer,
    AlphabetFilter,
    RemoteSearch,
    NumberProp,
  },
  props: {
    researchResult: {
      type: Object as PropType<ResearchResult>,
      required: true,
    },
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const addAllergen = ref(false);
    const answer = props.researchResult.getOrCreateAnswer(props.question);
    const filledCheck = (): void => {
      answer.filled = answer.selectedAnswerVariants.length > 0;
      props.researchResult.calculateFilling();
    };
    const selectVariant = (selected: boolean, variantId: string) => {
      answer.setSelectedAnswerVariant(selected, variantId);
      filledCheck();
    };

    const toggleAddAllergen = async (toggle: boolean) => {
      addAllergen.value = !addAllergen.value
    };
    return {
      selectVariant,
      filledCheck,
      answer,
      toggleAddAllergen,
      addAllergen,
    };
  },
});
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/elements/base-style.scss';

  .hidden {
    display: none;
  }

  .icon-plus {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .icon-back {
    width: 24px;
    height: 24px;
  }

  .researche-title {
    width: calc(100% - 2px);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }

  .researche-name {
    min-height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #343e5c;
    font-size: 14px;
    text-transform: uppercase;
  }

  .body {
    padding: 0 10px;
  }

  .blur {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.3;
    z-index: 20;
  }

  .select-form {
    position:fixed;
    top: 52%;
    left: 50%;
    width: calc(99% - 22px);
    height: calc(92% - 2px);
    transform: translate(-50%, -50%);
    z-index: 21;
    max-height: 95vh;
    background: #ffffff;
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    overflow: hidden;
    overflow-y: auto;
  }

  .header-block {
    padding: 10px;
    border-bottom: $light-pink-border;
  }

  .item-line {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    background: $site_light_gray;
    padding: 10px;
    margin-top: 10px;
  }

  .left {
    max-width: 900px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item-name {
    color: #343e5c;
    min-width: 280px;
  }

  .item-counter {
    min-width: 180px;
    margin-right: 20px;
  }

  .el-form-item {
    margin: 0;
  }
  .el-divider {
    margin: 10px 0;
  }

  :deep(.el-form-item) {
    display: block;
    width: 100%;
    margin-bottom: 16px;
  }

  :deep(.el-form-item__content) {
    width: 100%;
  }

  :deep(.el-input__inner) {
    border-radius: 40px;
    padding-left: 25px;
    height: 40px;
    width: 100%;
    display: flex;
    font-family: Comfortaa, Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: $site_dark_gray;
  }

  :deep(.el-input__inner::placeholder) {
    color: $site_light_pink;
  }

  :deep(.el-select .el-input .el-select__caret) {
    color: #343e5c;
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
  }

  .el-select {
    width: 100%;
  }

  :deep(.el-input__prefix) {
    left: 230px;
    top: -3px;
  }

  :deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
    width: 100%;
  }

  :deep(.el-input__icon) {
    color: $site_dark_gray;
  }

  :deep(.el-input__suffix) {
    top: -3px;
  }

  :deep(.el-form-item__label) {
    color: $site_light_pink;
    padding: 0 !important;
    text-transform: uppercase;
    margin-left: 5px;
    font-size: 14px;
    margin-bottom: 6px;
  }

  :deep(.el-input__prefix) {
    left: auto;
    right: 10px;
  }

  :deep(.el-textarea__inner) {
    color: $site_dark_gray;
    padding-left: 25px;
  }

  :deep(.el-textarea__inner::placeholder) {
    color: $site_light_pink;
  }

  :deep(.el-select-dropdown__wrap) {
    max-width: 600px;
  }

  :deep(.el-select-dropdown__wrap) {
    max-width: 600px;
  }

  :deep(.el-select-dropdown) {
    min-width: 600px;
  }

  :deep(.el-select-dropdown__item.selected) {
    height: auto;
  }

</style>
