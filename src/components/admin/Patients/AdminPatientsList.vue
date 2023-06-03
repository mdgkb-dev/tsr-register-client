<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <div class="filter-block">
      <GridContainer max-width="900px" grid-gap="27px 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0px" >
        <template #grid-items>

          <InfoItem  margin="0" :withOpenWindow="false" :withIcon="false" height="76px" background="#F5F5F5" borderColor="#C4C4C4" padding="7px" :withHover="false" > 
            <template #title>
              <StringItem string="поиск и сортировка" font-size="10px" padding="0" />
            </template>
            <template #close-inside-content>
              <div :style="{ width: '100%' }">
                <RemoteSearch
                  :must-be-translated="true"
                  :key-value="schema.patient.key"
                  placeholder="Начните вводить ФИО"
                  @select="selectSearch"
                  maxWidth="100%"
                />
                <SortList class="filters-block" :store-mode="true" @load="loadPatients" labelName="" maxWidth="100%"/>
              </div>
            </template>
          </InfoItem>

          <InfoItem  margin="0" :withOpenWindow="false" :withIcon="false" height="76px" background="#F5F5F5" borderColor="#C4C4C4" padding="7px" :withHover="false"> 
            <template #title>
              <StringItem string="регистры" font-size="10px" padding="0" />
            </template>
            <template #close-inside-content>
              <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(calc(50% - 7px), 1fr))" margin="0px" >
                <template #grid-items>
                  <Button
                    text="Альфа-маннозиоз"
                    :with-icon="false"
                    width="auto"
                    height="34px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#ffffff"
                    background-hover="#DFF2F8"
                    :toggleMode="true"
                    fontSize="12px"
                  >
                  </Button>
                  <Button
                    text="Анафилаксия"
                    :with-icon="false"
                    width="auto"
                    height="34px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#ffffff"
                    background-hover="#DFF2F8"
                    :toggleMode="true"
                    fontSize="12px"
                  >
                  </Button>
                  <Button
                    text="Болезнь Помпе"
                    :with-icon="false"
                    width="auto"
                    height="34px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#ffffff"
                    background-hover="#DFF2F8"
                    :toggleMode="true"
                    fontSize="12px"
                  >
                  </Button>
                  <Button
                    text="СМА"
                    :with-icon="false"
                    width="auto"
                    height="34px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#ffffff"
                    background-hover="#DFF2F8"
                    :toggleMode="true"
                    fontSize="12px"
                  >
                  </Button>
              
                </template>
              </Gridcontainer>
            </template>
          </InfoItem>

          <GridContainer max-width="500px" grid-gap="10px" grid-template-columns="repeat(auto-fit, minmax(95px, 1fr))" margin="0px" background="#F5F6F8" >
            <template #grid-items>

              <InfoItem  margin="0" :withOpenWindow="false" :withIcon="false" height="76px" background="#F5F5F5" borderColor="#C4C4C4" padding="7px" :withHover="false"> 
                <template #title>
                  <StringItem string="пол" font-size="10px" padding="0" />
                </template>
                <template #close-inside-content>
                  <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px" >
                    <template #grid-items>
                      <Button
                        text="Мужской"
                        :with-icon="false"
                        width="auto"
                        height="34px"
                        border-radius="5px"
                        color="#006BB4"
                        background="#ffffff"
                        background-hover="#DFF2F8"
                        :toggleMode="true"
                        fontSize="12px"
                      >
                      </Button>
                      <Button
                        text="Женский"
                        :with-icon="false"
                        width="auto"
                        height="34px"
                        border-radius="5px"
                        color="#006BB4"
                        background="#ffffff"
                        background-hover="#DFF2F8"
                        :toggleMode="true"
                        fontSize="12px"
                      >
                      </Button>
                    </template>
                  </Gridcontainer>
                </template>
              </InfoItem>

              <InfoItem  margin="0" :withOpenWindow="false" :withIcon="false" height="76px" background="#F5F5F5" borderColor="#C4C4C4" padding="7px" :withHover="false"> 
                <template #title>
                  <StringItem string="инвалидность" font-size="10px" padding="0" />
                </template>
                <template #close-inside-content>
              <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(calc(50% - 7px), 1fr))" margin="0px" >
                <template #grid-items>
                  <Button
                    text="A"
                    :with-icon="false"
                    width="auto"
                    height="34px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#ffffff"
                    background-hover="#DFF2F8"
                    :toggleMode="true"
                    fontSize="12px"
                  >
                  </Button>
                  <Button
                    text="B"
                    :with-icon="false"
                    width="auto"
                    height="34px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#ffffff"
                    background-hover="#DFF2F8"
                    :toggleMode="true"
                    fontSize="12px"
                  >
                  </Button>
                  <Button
                    text="C"
                    :with-icon="false"
                    width="auto"
                    height="34px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#ffffff"
                    background-hover="#DFF2F8"
                    :toggleMode="true"
                    fontSize="12px"
                  >
                  </Button>
              
                </template>
              </Gridcontainer>
                </template>
              </InfoItem>

            </template>
          </GridContainer>

          <InfoItem  margin="0" :withOpenWindow="false" :withIcon="false" height="76px" background="#F5F5F5" borderColor="#C4C4C4" padding="7px" :withHover="false"> 
            <template #title>
              <StringItem string="документы" font-size="10px" padding="0"/>
            </template>
            <template #close-inside-content>
              <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px" >
                <template #grid-items>
                  <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(calc(33% - 7px), 1fr))" margin="0px" >
                    <template #grid-items>
                      <Button
                        text="Паспорт"
                        :with-icon="false"
                        width="auto"
                        height="34px"
                        border-radius="5px"
                        color="#006BB4"
                        background="#ffffff"
                        background-hover="#DFF2F8"
                        :toggleMode="true"
                        fontSize="12px"
                      >
                      </Button>
                      <Button
                        text="СНИЛС"
                        :with-icon="false"
                        width="auto"
                        height="34px"
                        border-radius="5px"
                        color="#006BB4"
                        background="#ffffff"
                        background-hover="#DFF2F8"
                        :toggleMode="true"
                        fontSize="12px"
                      >
                      </Button>
                      <Button
                        text="ОМС"
                        :with-icon="false"
                        width="auto"
                        height="34px"
                        border-radius="5px"
                        color="#006BB4"
                        background="#ffffff"
                        background-hover="#DFF2F8"
                        :toggleMode="true"
                        fontSize="12px"
                      >
                      </Button>
                    </template>
                  </Gridcontainer>
                  <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(88px, 1fr))" margin="0px" >
                    <template #grid-items>
                      <Button
                        text="Свидетельство пенсионера"
                        :with-icon="false"
                        width="auto"
                        height="34px"
                        border-radius="5px"
                        color="#006BB4"
                        background="#ffffff"
                        background-hover="#DFF2F8"
                        :toggleMode="true"
                        fontSize="12px"
                      >
                      </Button>
                      <Button
                        text="Удостоверение инвалида"
                        :with-icon="false"
                        width="auto"
                        height="34px"
                        border-radius="5px"
                        color="#006BB4"
                        background="#ffffff"
                        background-hover="#DFF2F8"
                        :toggleMode="true"
                        fontSize="12px"
                      >
                      </Button>
                    </template>
                  </Gridcontainer>
                </template>
              </Gridcontainer>
            </template>
          </InfoItem>

        </template>
      </Gridcontainer>

      <div class="tools-block">
        <InfoItem  margin="0" :withOpenWindow="false" :withIcon="false" height="76px" background="#F5F5F5" borderColor="#C4C4C4" padding="7px" :withHover="false"> 
          <template #title>
            <StringItem string="сохранить" font-size="10px" padding="0"/>
          </template>
          <template #close-inside-content>
            <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px" >
              <template #grid-items>
                <Button
                  text="xlsx"
                  :with-icon="false"
                  width="auto"
                  height="34px"
                  border-radius="5px"
                  color="#006BB4"
                  background="#DFF2F8"
                  background-hover="#DFF2F8"
                  fontSize="12px"
                >
                </Button>
                <Button
                  text="pdf"
                  :with-icon="false"
                  width="auto"
                  height="34px"
                  border-radius="5px"
                  color="#006BB4"
                  background="#DFF2F8"
                  background-hover="#DFF2F8"
                  fontSize="12px"
                >
                </Button>
              </template>
            </Gridcontainer>
          </template>
        </InfoItem>
      </div>
      <!-- <RemoteSearch
        :must-be-translated="true"
        :key-value="schema.patient.key"
        placeholder="Начните вводить ФИО пациента"
        @select="selectSearch"
      />
      <FilterMultipleSelect
        placeholder="Выбрать регистры"
        class="filters-block"
        :filter-model="filterByRegister"
        :options="createRegistersOptions()"
        @load="loadPatients"
      />

      <FiltersList default-label="Мужской и женский пол" :models="createSexFilters()" @load="loadPatients" />
      <SortList class="filters-block" :store-mode="true" @load="loadPatients" /> -->
    </div>
    <div class="scroll-block">
      <div class="patient-count">Количество пациентов: {{ count }}</div>
      <div v-for="patient in patients" :key="patient.id">
        <CollapseItem :is-collaps="false" padding="0 8px">
          <template #inside-title>
            <div class="flex-block" @click.prevent="() => undefined">
              <div class="item-flex">
                <div class="line-item-left">
                  <Button
                    :with-icon="true"
                    width="40px"
                    height="40px"
                    border-radius="5px"
                    color="#006BB4"
                    background="#DFF2F8"
                    background-hover="#DFF2F8"
                    :color-swap="false"
                    @click.prevent="edit(patient.id)"
                  >
                    <template #icon>
                      <svg class="icon-edit">
                        <use xlink:href="#edit"></use>
                      </svg>
                    </template>
                  </Button>
                  <StringItem :string="patient.human.getFullName()" color="#006BB4" font-size="17px" minWidth="240px" width="100%"/>
                </div>

                <div class="line-item-right">
                  <Button 
                    :text="patient.human.getGender()"
                    :withIcon="false"
                    width="42px" 
                    height="42px" 
                    color="#006BB4" 
                    background="#DFF2F8"
                    backgroundHover="#DFF2F8"
                    :colorSwap="false"
                    margin="2px 10px 0 0"
                    fontSize="18px"
                  >
                  </Button>
                  <!-- <StringItem :string="patient.human.getGender()" color="#343E5C" font-size="20px" /> -->
                  <InfoItem  margin="0" :withOpenWindow="false" > 
                    <template #title>
                      <StringItem string="инвалидность" font-size="10px" padding="0 0 0 3px"/>
                    </template>
                    <template #close-inside-content>
                      <!-- <div v-if="patient.getActuallyDisability().getActuallyEdv()" class="disability-circles"> -->
                      <StringItem string="А" font-size="14px" padding="0" margin="0 5px 0 0" color="#B0A4C0" />
                      <StringItem string="В" font-size="14px" padding="0" margin="0 5px 0 0" color="" />
                      <StringItem string="С" font-size="14px" padding="0" margin="0 0 0 0" color="#B0A4C0" />
                      <StringItem string=", до 29.12.23г." font-size="12px" padding="0" color=""/>
                      <!-- </div> -->
                      <!-- <div v-else>Нет справок ЕДВ</div> -->
                    </template>
                  </InfoItem>
                </div>
              </div>
              <div class="item-flex">
                <GridContainer max-width="1920px" grid-gap="10px" grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))" margin="0px">
                  <template #grid-items>
                    <GridContainer
                      max-width="auto"
                      grid-gap="10px"
                      grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))"
                      margin="0px"
                    >
                      <template #grid-items>
                        <InfoItem margin="0" open-height="auto">
                          <template #title>
                            <StringItem string="дата рождения" font-size="10px" padding="0 0 0 3px" />
                          </template>
                          <template #close-inside-content>
                            <StringItem :string="$dateTimeFormatter.format(patient.human.dateBirth)" font-size="16px" padding="0" />
                          </template>

                          <!-- #TODO -->
                          <template #open-inside-content>
                            <GridContainer
                              max-width="auto"
                              grid-gap="10px"
                              grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))"
                              margin="0px"
                            >
                              <template #grid-items>
                                <SmallDatePicker
                                  v-model:model-value="patient.human.dateBirth"
                                  placeholder="Выбрать"
                                  width="100%"
                                  height="34px"
                                  @change="updateHuman(patient.human)"
                                />
                                <Button
                                  text="Сохранить"
                                  :with-icon="false"
                                  width="100%"
                                  height="34px"
                                  border-radius="5px"
                                  color="#006BB4"
                                  background="#DFF2F8"
                                  background-hover="#DFF2F8"
                                  :color-swap="false"
                                >
                                </Button>
                              </template>
                            </GridContainer>
                          </template>
                          <!-- end -->
                        </InfoItem>
                        <InfoItem margin="0" open-height="auto" open-width="290px">
                          <template #title>
                            <StringItem string="представители" font-size="10px" padding="0 0 0 3px" />
                          </template>
                          <template #close-inside-content>
                            <div v-for="rep in patient.patientsRepresentatives" :key="rep">
                              <StringItem
                                v-if="patient.patientsRepresentatives"
                                :string="rep.getRepresentativeParentType() + ',&nbsp'"
                                font-size="14px"
                                padding="0"
                              />
                            </div>
                          </template>

                          <!-- #TODO -->
                          <template #open-inside-content>
                            <GridContainer
                              max-width="auto"
                              grid-gap="10px"
                              grid-template-columns="repeat(auto-fit, minmax(276px, 1fr))"
                              margin="0px"
                            >
                              <template #grid-items>
                                <div v-for="(rep, key, index) in patient.patientsRepresentatives" :key="index">
                                  <InfoItem margin="0" :with-open-window="false" height="32px">
                                    <template #title>
                                      <StringItem
                                        :string="rep.getRepresentativeParentType()"
                                        font-size="10px"
                                        padding="0 0 0 3px"
                                        color="#D42E61"
                                      />
                                    </template>
                                    <template #close-inside-content>
                                      <div>
                                        <StringItem
                                          v-if="rep.representative.human.contact.phone"
                                          :string="rep.representative.human.contact.phone"
                                          font-size="12px"
                                          padding="0 0 0 3px"
                                          color="#1979CF"
                                        />
                                        <StringItem :string="rep.representative.human.getFullName()" font-size="12px" padding="0 0 0 3px" />
                                      </div>
                                    </template>
                                  </InfoItem>
                                </div>
                                <Button
                                  :with-icon="true"
                                  width="100%"
                                  height="34px"
                                  border-radius="5px"
                                  color="#00BEA5"
                                  background="#C1EFEB"
                                  background-hover="#C1EFEB"
                                  :color-swap="false"
                                >
                                  <template #icon>
                                    <svg class="icon-plus">
                                      <use xlink:href="#plus"></use>
                                    </svg>
                                  </template>
                                </Button>
                              </template>
                            </GridContainer>
                          </template>
                          <!-- end -->
                        </InfoItem>
                      </template>
                    </GridContainer>
                    <InfoItem margin="0 0 0 0px" open-height="auto" open-width="100%">
                      <template #title>
                        <StringItem string="регистры" font-size="10px" padding="0 0 0 3px" />
                      </template>
                      <template #close-inside-content>
                        <div class="block">
                          <div v-for="patientRegister in patient.patientsRegisters" :key="patientRegister.id">
                            <StringItem :string="patientRegister.register.getTagName() + ','" font-size="14px" padding="0" />
                          </div>
                        </div>
                      </template>

                      <!-- #TODO -->
                      <template #open-inside-content>
                        <GridContainer
                          max-width="100%"
                          grid-gap="7px"
                          grid-template-columns="repeat(auto-fit, minmax(99px, 1fr))"
                          margin="0px"
                        >
                          <template #grid-items>
                            <div v-for="patientRegister in patient.patientsRegisters" :key="patientRegister.id">
                              <InfoItem margin="0" :with-open-window="false" height="32px" :with-icon="false" color-selected="#E46862">
                                <template #title>
                                  <svg class="icon-del">
                                    <use xlink:href="#del"></use>
                                  </svg>
                                </template>
                                <template #close-inside-content>
                                  <StringItem :string="patientRegister.register.getTagName()" font-size="11px" padding="0" />
                                </template>
                              </InfoItem>
                            </div>

                            <Button
                              :with-icon="true"
                              width="100%"
                              height="34px"
                              border-radius="5px"
                              color="#00BEA5"
                              background="#C1EFEB"
                              background-hover="#C1EFEB"
                              :color-swap="false"
                            >
                              <template #icon>
                                <svg class="icon-plus">
                                  <use xlink:href="#plus"></use>
                                </svg>
                              </template>
                            </Button>
                          </template>
                        </GridContainer>
                      </template>
                      <!-- end -->
                    </InfoItem>
                    <InfoItem margin="0 0 0 0px">
                      <template #title>
                        <StringItem string="диагнозы" font-size="10px" padding="0 0 0 3px" />
                      </template>
                      <template #close-inside-content>
                        <div v-for="diagnosis in patient.patientDiagnosis" :key="diagnosis">
                          <StringItem :string="diagnosis.mkbItem.getCode() + ',&nbsp'" font-size="14px" padding="0" />
                        </div>
                      </template>

                      <!-- #TODO -->
                      <template #open-inside-content>
                        <GridContainer
                          max-width="100%"
                          grid-gap="7px"
                          grid-template-columns="repeat(auto-fit, minmax(99px, 1fr))"
                          margin="0px"
                        >
                          <template #grid-items>
                            <div v-for="diagnosis in patient.patientDiagnosis" :key="diagnosis">
                              <InfoItem margin="0" :with-open-window="false" height="32px" :with-icon="false" color-selected="#E46862">
                                <template #title>
                                  <svg class="icon-del">
                                    <use xlink:href="#del"></use>
                                  </svg>
                                </template>
                                <template #close-inside-content>
                                  <StringItem :string="diagnosis.mkbItem.getCode() + ',&nbsp'" font-size="11px" padding="0" />
                                </template>
                              </InfoItem>
                            </div>

                            <Button
                              :with-icon="true"
                              width="100%"
                              height="34px"
                              border-radius="5px"
                              color="#00BEA5"
                              background="#C1EFEB"
                              background-hover="#C1EFEB"
                              :color-swap="false"
                            >
                              <template #icon>
                                <svg class="icon-plus">
                                  <use xlink:href="#plus"></use>
                                </svg>
                              </template>
                            </Button>
                          </template>
                        </GridContainer>
                      </template>
                      <!-- end -->
                    </InfoItem>
                    <InfoItem margin="0 0 0 0px">
                      <template #title>
                        <StringItem string="документы" font-size="10px" padding="0 0 0 3px" />
                      </template>
                      <template #close-inside-content>
                        <div v-for="document in patient.human.documents" :key="document">
                          <StringItem :string="document.documentType.getTagName()" font-size="14px" padding="0" />
                        </div>
                      </template>

                      <!-- #TODO -->
                      <template #open-inside-content>
                        <GridContainer
                          max-width="100%"
                          grid-gap="7px"
                          grid-template-columns="repeat(auto-fit, minmax(99px, 1fr))"
                          margin="0px"
                        >
                          <template #grid-items>
                            <div v-for="document in patient.human.documents" :key="document">
                              <InfoItem margin="0" :with-open-window="false" height="32px" :with-icon="false" color-selected="#E46862">
                                <template #title>
                                  <svg class="icon-del">
                                    <use xlink:href="#del"></use>
                                  </svg>
                                </template>
                                <template #close-inside-content>
                                  <StringItem :string="document.documentType.getTagName()" font-size="11px" padding="0" />
                                </template>
                              </InfoItem>
                            </div>

                            <Button
                              :with-icon="true"
                              width="100%"
                              height="34px"
                              border-radius="5px"
                              color="#00BEA5"
                              background="#C1EFEB"
                              background-hover="#C1EFEB"
                              :color-swap="false"
                            >
                              <template #icon>
                                <svg class="icon-plus">
                                  <use xlink:href="#plus"></use>
                                </svg>
                              </template>
                            </Button>
                          </template>
                        </GridContainer>
                      </template>
                      <!-- end -->
                    </InfoItem>
                  </template>
                </GridContainer>
              </div>
            </div>
          </template>

          <template #inside-content> </template>
        </CollapseItem>
      </div>
    </div>

  </AdminListWrapper>
  <svg width="0" height="0" class="hidden">
    <symbol id="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        d="M13 3C9.145 3 6 6.145 6 10C6 12.41 7.23 14.55 9.094 15.813C5.527 17.343 3 20.883 3 25H5C5 20.57 8.57 17 13 17C15.145 17 17.063 17.879 18.5 19.25L13.781 23.969L13.719 24.281L13.031 27.813L12.719 29.281L14.188 28.969L17.718 28.281L18.031 28.219L28.125 18.125C29.285 16.965 29.285 15.035 28.125 13.875C27.5652 13.3197 26.8103 13.0056 26.0218 12.9998C25.2333 12.994 24.4739 13.297 23.906 13.844L19.938 17.813C19.0565 16.9686 18.0292 16.291 16.906 15.813C17.8575 15.1707 18.637 14.3049 19.1764 13.2915C19.7158 12.2782 19.9986 11.148 20 10C20 6.145 16.855 3 13 3ZM13 5C15.773 5 18 7.227 18 10C18 12.773 15.773 15 13 15C10.227 15 8 12.773 8 10C8 7.227 10.227 5 13 5ZM26 15C26.254 15 26.52 15.082 26.719 15.281C26.8134 15.3721 26.8885 15.4813 26.9398 15.6021C26.9911 15.7229 27.0175 15.8528 27.0175 15.984C27.0175 16.1152 26.9911 16.2451 26.9398 16.3659C26.8885 16.4867 26.8134 16.5959 26.719 16.687L17.031 26.375L15.25 26.75L15.625 24.969L25.313 15.281C25.4022 15.1897 25.5092 15.1177 25.6274 15.0693C25.7455 15.021 25.8724 14.9974 26 15Z"
      ></path>
      <path
        d="M13 3C9.145 3 6 6.145 6 10C6 12.41 7.23 14.55 9.094 15.813C5.527 17.343 3 20.883 3 25H5C5 20.57 8.57 17 13 17C15.145 17 17.063 17.879 18.5 19.25L13.781 23.969L13.719 24.281L13.031 27.813L12.719 29.281L14.188 28.969L17.718 28.281L18.031 28.219L28.125 18.125C29.285 16.965 29.285 15.035 28.125 13.875C27.5652 13.3197 26.8103 13.0056 26.0218 12.9998C25.2333 12.994 24.4739 13.297 23.906 13.844L19.938 17.813C19.0565 16.9686 18.0292 16.291 16.906 15.813C17.8575 15.1707 18.637 14.3049 19.1764 13.2915C19.7158 12.2782 19.9986 11.148 20 10C20 6.145 16.855 3 13 3ZM13 5C15.773 5 18 7.227 18 10C18 12.773 15.773 15 13 15C10.227 15 8 12.773 8 10C8 7.227 10.227 5 13 5ZM26 15C26.254 15 26.52 15.082 26.719 15.281C26.8134 15.3721 26.8885 15.4813 26.9398 15.6021C26.9911 15.7229 27.0175 15.8528 27.0175 15.984C27.0175 16.1152 26.9911 16.2451 26.9398 16.3659C26.8885 16.4867 26.8134 16.5959 26.719 16.687L17.031 26.375L15.25 26.75L15.625 24.969L25.313 15.281C25.4022 15.1897 25.5092 15.1177 25.6274 15.0693C25.7455 15.021 25.8724 14.9974 26 15Z"
      ></path>
    </symbol>
    <symbol id="iconamoon_edit-light" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path
        d="M6.2513 2.50053L7.5013 3.75053M5.41797 8.33386H8.7513M2.08464 6.66719L1.66797 8.33386L3.33464 7.91719L8.16214 3.08969C8.31836 2.93342 8.40612 2.7215 8.40612 2.50053C8.40612 2.27956 8.31836 2.06763 8.16214 1.91136L8.09047 1.83969C7.9342 1.68347 7.72227 1.5957 7.5013 1.5957C7.28033 1.5957 7.06841 1.68347 6.91214 1.83969L2.08464 6.66719Z"
        stroke-width="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>

    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>

    <symbol id="del" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path
        d="M2.91797 8.75C2.6888 8.75 2.49255 8.66833 2.32922 8.505C2.16589 8.34167 2.08436 8.14556 2.08464 7.91667V2.5H1.66797V1.66667H3.7513V1.25H6.2513V1.66667H8.33464V2.5H7.91797V7.91667C7.91797 8.14583 7.8363 8.34208 7.67297 8.50542C7.50964 8.66875 7.31352 8.75028 7.08464 8.75H2.91797ZM7.08464 2.5H2.91797V7.91667H7.08464V2.5ZM3.7513 7.08333H4.58464V3.33333H3.7513V7.08333ZM5.41797 7.08333H6.2513V3.33333H5.41797V7.08333Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { Document, QuestionFilled } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref, ref } from 'vue';

import Human from '@/classes/Human';
import Patient from '@/classes/Patient';
import Register from '@/classes/Register';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import InfoItem from '@/components/admin/Patients/InfoItem.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import Pagination from '@/components/Pagination.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
// import FilterDateForm from '@/components/TableFilters/FilterDateForm.vue';
import FilterResetButton from '@/components/TableFilters/FilterResetButton.vue';
import FiltersList from '@/components/TableFilters/FiltersList.vue';
import SortButton from '@/components/TableFilters/SortButton.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/shared/IOption';
import PatientsFiltersLib from '@/libs/filters/PatientsFiltersLib';
import PatientsSortsLib from '@/libs/sorts/PatientsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
// import PatientsFiltersLib from '@/services/Provider/Provider/libs/filters/PatientsFiltersLib';
// import PatientsSortsLib from '@/services/Provider/libs/sorts/PatientsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPatientsList',
  components: {
    FilterMultipleSelect,
    RemoteSearch,
    SortButton,
    Pagination,
    TableButtonGroup,
    SortList,
    // FilterDateForm,
    // FilterSet,
    FilterResetButton,
    AdminListWrapper,
    FiltersList,
    QuestionFilled,
    Document,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
    GridContainer,
    SmallDatePicker,
  },
  setup() {
    const patients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/items']);
    const count: Ref<number> = computed(() => Provider.store.getters['patients/count']);
    const registers: Ref<Register[]> = computed(() => Provider.store.getters['registers/items']);
    const filterByRegister: Ref<FilterModel> = ref(new FilterModel());
    // const filteredPatients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/filteredPatients']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);

    const loadPatients = async () => {
      await Provider.loadItems();
    };

    const load = async () => {
      await Provider.store.dispatch('registers/getAll');
      await loadPatients();

      await Provider.store.dispatch('meta/getOptions', registers);
      filterByRegister.value = PatientsFiltersLib.byRegisters([]);
    };

    const addPatient = async (): Promise<void> => {
      const patient = new Patient();
      await Provider.store.dispatch('patients/createWithoutReset', patient);
      Provider.store.commit('patients/unshiftToAll', patient);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Пациенты',
        buttons: [{ text: 'Добавить пациента', type: 'primary', action: addPatient }],
      },
      sortsLib: PatientsSortsLib,
      getAction: 'getAllWithCount',
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/patients/${event.value}`);
    };

    const createSexFilters = (): FilterModel[] => {
      return [PatientsFiltersLib.onlyMale(), PatientsFiltersLib.onlyFemale()];
    };

    const createRegistersOptions = (): IOption[] => {
      const ids: IOption[] = [];
      registers.value.forEach((r: Register) => ids.push({ value: r.id as string, label: r.name }));
      return ids;
    };

    const updateHuman = async (human: Human): Promise<void> => {
      await Provider.withHeadLoader(async () => {
        await Provider.store.dispatch('humans/update', human);
      });
    };

    const updateIsMale = async (human: Human): Promise<void> => {
      human.isMale = !human.isMale;
      await updateHuman(human);
    };

    return {
      updateIsMale,
      updateHuman,
      count,
      filterByStatus,
      createRegistersOptions,
      authModalVisible,
      selectSearch,
      filterByRegister,
      loadPatients,
      patients,
      createSexFilters,
      ...Provider.getAdminLib(),
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}
.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-edit {
  width: 28px;
  height: 28px;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0px;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0px;
}

.icon-plus {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-block {
  position: relative;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: end;
  width: calc(100% - 20px);
  padding: 10px 10px 24px 10px;
  background: #F5F5F5;
  height: auto;
  border-bottom: 1px solid #c4c4c4;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: 10px;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px;
  }
  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}
</style>
