import type { Todo } from "../data/types";

export function leftItemsAmount(todoArr: Todo[]): number {
        return [...todoArr.filter(todo => !todo.checked)].length
}