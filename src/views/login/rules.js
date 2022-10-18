import { reactive } from 'vue';
export const rules = reactive({
  username: [
    { required: true, message: '请填写用户名', trigger: 'blur' },
    { validator: validateUsername, message: '用户名格式错误', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
    { validator: validatePass, message: '密码格式错误', trigger: 'blur' },
  ],
});

function validateUsername(...arg) {
  let [rule, value] = arg;

  return /^\w{6,16}$/.test(value);
}
function validatePass(...arg) {
  let [rule, value] = arg;

  return /^\w{6,16}$/.test(value);
}
