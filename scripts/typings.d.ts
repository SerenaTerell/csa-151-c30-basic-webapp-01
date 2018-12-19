// Type definitions

interface iAppContainer {
  close(): void;
}

interface iGroup {
  id: number,
  name: string
}


interface iGroupResult {
  success: boolean,
  msg?: string,
  err?: string,
  data?: iGroup
}

interface iNavigationElement {
  name: string,
  icon: string,
  manager: string
}

interface iDOMCreateOptions {
  css?: string | Array<string> // todo Ellipsis operator ...
  icon?: string // eg fa-plus-circle
  icon_class?: Array<string>,
  text?: string
}