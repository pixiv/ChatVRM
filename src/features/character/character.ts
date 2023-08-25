export type Character = 'hoge' | 'fuga'

export const characters: Character[] = ['hoge', 'fuga']

export const toImageUrl = (character: Character) => {
  switch (character) {
    case 'hoge':
      return 'images/avatar_00.gif'
    case 'fuga':
      return 'images/avatar_01.gif'
  }
}
