import type {Ref} from "vue";

interface ResizeListener {
	width: Readonly<Ref<number>>;
	height: Readonly<Ref<number>>;
	registerCallback: (callback: (size: { width: number; height: number }) => void) => () => void;
}