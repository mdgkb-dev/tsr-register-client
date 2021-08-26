// import Anthropometry from '@/classes/anthropometry/Anthropometry';
// import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
// import mutations from '@/store/modules/anthropometry/mutations';
// import StateType from '@/store/modules/anthropometry/state';

// describe('Vuex Anthropometry Mutations', () => {
//   let state: StateType;

//   beforeEach(() => {
//     state = {
//       anthropometry: new Anthropometry(),
//       anthropometries: [],
//     };
//   });

//   test('Мутация create добавляет в state параметр антропометрии.', () => {
//     // Arrange
//     expect(state.anthropometries).toHaveLength(0);
//     const anthropometry: IAnthropometry = new Anthropometry({
//       id: '65bc6bb1-20cc-44dc-96a7-27bfafc0e5a5',
//       name: 'Обхват груди',
//       measure: 'см',
//     });
//     const { create } = mutations;

//     // Act
//     create(state, anthropometry);

//     // Assert
//     expect(state.anthropometries).toHaveLength(1);
//     expect(state.anthropometries).toContainEqual(anthropometry);
//   });
// });
