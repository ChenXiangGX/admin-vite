import { reactive } from 'vue';
export const rules = reactive({
  oldPassword: [
    { required: true, message: '请正确填写旧密码', trigger: 'blur' },
    { validator: validatePass, message: '密码格式错误', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请正确填写新密码', trigger: 'blur' },
    { validator: validatePass, message: '密码格式错误', trigger: 'blur' },
  ],
});

function validatePass(...arg) {
  let [rule, value] = arg;
  return /^\w{6,16}$/.test(value);
}
