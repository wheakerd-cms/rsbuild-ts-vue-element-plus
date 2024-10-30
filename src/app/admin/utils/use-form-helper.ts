import {nextTick, Ref, ref} from "vue";
import {ElForm} from "element-plus";
import {unref} from "@vue/runtime-core";

export const useFormHelper = () => {
	const formRef: Ref<InstanceType<typeof ElForm> | undefined> = ref();
	const defaultFormData: Ref<Record<string, any>> = ref({});
	const formData: Ref<Record<string, any> | undefined> = ref();

	const formRegister = (value: InstanceType<typeof ElForm> | undefined) => {
		formRef.value = value;
	};

	const getFormRef = async () => {
		await nextTick();
		const form: InstanceType<typeof ElForm> | undefined = unref(formRef);
		if (!form) {
			console.error('The form is not registered!');
		}
		return form;
	};

	const setDefaultFromData = (value: Record<string, any>) => {
		defaultFormData.value = value;
	};

	const formMethods = {
		resetFormData: () => {
			formData.value = unref(defaultFormData);
		},
		getFormData: async (): Promise<Record<string, any> | undefined> => {
			const formRef: InstanceType<typeof ElForm> | undefined = await getFormRef();
			if (!formRef) return;
			const res = await formRef.validate().catch(
				err => console.error('submit error!', err),
			);

			if (res) return formData.value;
		},
	};

	return {
		formRegister,
		setDefaultFromData,
		formParams: {
			formData,
		},
		formMethods,
	};
};