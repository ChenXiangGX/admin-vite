import { reactive } from 'vue';
import { doLogin } from '@/api/user';
export const form = reactive({
  username: '18738455668_s',
  password: '888666',
});

export function loginAction() {
  let { username, password } = form;
  return doLogin({
    username,
    password,
  });
}
