/* import { createStore, Store } from 'vuex';
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';

import { components } from '@/plugins/ElementPlus';
import AnthropometryList from '@/components/Anthropometry/AnthropometryList.vue';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

const mockDeleteAction = jest.fn();
const mockRouterPush = jest.fn();

jest.mock('vue-router', () => {
  return {
    useRouter: () => {
      return {
        push: mockRouterPush,
      };
    }
  };
});

describe('AnthropometryList.vue', () => {
  let store: Store<{
    anthropometries: IAnthropometry[];
  }>;

  // Нерешённая проблема типизации:
  // https://github.com/vuejs/vue-test-utils-next/issues/272#issuecomment-744230014
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    jest.resetAllMocks();

    store = createStore({
      state: {
        anthropometries: [
          { id: 'bf3bd8cd-b17b-40fb-9457-fd0413964df7', name: 'Вес', measure: 'кг', isHeight: jest.fn(), isWeight: jest.fn() },
          { id: 'b6dd3026-87b1-464c-8663-bbd295c750c4', name: 'Рост', measure: 'см', isHeight: jest.fn(), isWeight: jest.fn() },
          { id: 'b60cc5fa-119e-4308-9e3a-671743efa218', name: 'Ширина плеч', measure: 'см', isHeight: jest.fn(), isWeight: jest.fn() },
          { id: '9b1b3c5d-155a-472b-926b-cfb06eb853b8', name: 'Объём лёгких', measure: 'см в кубе', isHeight: jest.fn(), isWeight: jest.fn() },
        ]
      },
      getters: {
        'anthropometry/anthropometries': (state) => state.anthropometries,
      },
      actions: {
        'anthropometry/getAll': jest.fn(),
        'anthropometry/delete': mockDeleteAction,
      },
    });

    wrapper = mount(AnthropometryList, {
      global: {
        provide: {
          store,
        },
        components: {
          ...components,
        }
      }
    });
  });

  test('Список записей из store отрисовывается корректно.', async () => {
    // Arrange
    const numberOfRecords = 4;

    // Act
    await flushPromises();

    // Assert
    expect(await wrapper.findAll('[data-test="anthropometryListTable"] .el-table__body-wrapper table tbody tr'))
      .toHaveLength(numberOfRecords);
  });

  test('Клик по кнопке "Добавить" перенаправляет на страницу параметра антропометри.', async () => {
    // Arrange
    const redirectPath = '/anthropometry/new';

    // Act
    await flushPromises();
    await wrapper.find('[data-test="MainHeadAddButton"]').trigger('click');

    // Assert
    expect(mockRouterPush).toHaveBeenCalledWith(redirectPath);
  });

  test('Клик по кнопке "Редактировать" перенаправляет на страницу параметра антропометри.', async () => {
    // Arrange
    const redirectPath = `/anthropometry/${store.state.anthropometries[1].id}`;

    // Act
    await flushPromises();
    const secondRowEditButton = wrapper
      .findAll('[data-test="anthropometryListTable"] .el-table__body-wrapper table tbody tr [data-test="tableButtonGroupEditButton"]')[1];
    await secondRowEditButton.trigger('click');

    // Assert
    expect(mockRouterPush).toHaveBeenCalledWith(redirectPath);
  });

  // test('Клик по кнопке "Удалить" перенаправляет на страницу параметра антропометри.', async () => {
  //   // Arrange
  //   const anthropometryId = store.state.anthropometries[3].id;

  //   // Act
  //   await flushPromises();
  //   await wrapper
  //     .findAll('[data-test="anthropometryListTable"] .el-table__body-wrapper table tbody tr [data-test="tableButtonGroupDeleteButton"]')[3]
  //     .trigger('click');

  //   // TODO: Не работает, т.к. popup подтверждения находится за пределами компонента в DOM.
  //   await wrapper.find('[id^="el-popper-"] .el-button--primary').trigger('click');

  //   // Assert
  //   expect(mockDeleteAction).toHaveBeenCalledWith(anthropometryId);
  // });
});
 */
