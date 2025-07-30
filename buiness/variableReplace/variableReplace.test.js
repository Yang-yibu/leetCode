import { strVariableInject1 } from './variableReplace';

test('{{ 变量 }} 值替换', () => {
  const dataPool = { name: 1, sys: { userName: '超级管理员' } };
  expect(
    strVariableInject1(
      '用户名称：{{ name }}；编码：{{code}}；系统名称：{{ sys.userName }} ',
      dataPool
    )
  ).toEqual('用户名称：1；编码：{{code}}；系统名称：超级管理员 ');
  expect(strVariableInject1('用户 {{sys.userName}}', dataPool)).toEqual('用户 超级管理员');
});
