const pageModules = import.meta.glob('../pages/**/**.vue'); //vite写法  获取到某个文件夹下的所有的文件

// console.log(pageModules);

export function addRoute(router, arr, parnetName = 'home') {
  if (!arr) return;
  console.log('开始生成动态路由');

  arr.forEach((v) => {
    if (v.is_link) {
      router.addRoute(parnetName, {
        path: v.path,
        name: v.name,
        // component: () => import("@/pages/" + v.component + ".vue"),  //webpack里 vue-cli里这样写可以
        component: pageModules['../pages/' + v.component + '.vue'],
        meta: {
          isDynamic: true, // 是否是动态  一会儿方便删除
          title: v.title,
        },
      });
    }
    //如果还有子级数据路由那就接着调用，
    if (v.children && v.children.length) {
      addRoute(router, v.children);
    }
  });

  // console.log(router.getRoutes()); //  打印出来的都是扁平化的  但是其他他们有层级
}
