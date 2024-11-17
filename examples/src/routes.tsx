import React from 'react';
import SimpleMenu from "@carefrees/simple-menu"

const menus = [
  { title: "展示1", path: "/test1" },
  {
    title: "展示2", path: "/test2",
    children: [
      { title: "展示2-1", path: "/test2-1" },
      { title: "展示2-2", path: "/test2-2" },
      {
        title: "展示2-3", path: "/test2-3",
        children: [
          { title: "展示2-3-1", path: "/test2-3-1", },
          {
            title: "展示2-3-2", path: "/test2-3-2",
            children: [
              {
                title: "展示2-3-2-1", path: "/test2-3-2-1",
                children: [
                  { title: "展示2-3-2-1-1", path: "/test2-3-2-1-1", },
                  { title: "展示2-3-2-1-2", path: "/test2-3-2-1-2", },
                ]
              },
            ]
          },
        ]
      },
      {
        title: "展示2-3-5", path: "/test5-3",
        children: [
          { title: "展示2-5-1", path: "/test5-3-1", },
          {
            title: "展示2-5-2", path: "/test5-3-2",
            children: [
              {
                title: "展示2-5-2-1", path: "/test5-3-2-1",
                children: [
                  { title: "展示2-5-2-1-1", path: "/test5-3-2-1-1", },
                  { title: "展示2-5-2-1-2", path: "/test5-3-2-1-2", },
                ]
              },
            ]
          },
        ]
      },
      { title: "展示2-4", path: "/test2-4" },
    ]
  },
  { title: "展示3", path: "/test3" },
  { title: "展示4", path: "/test4" },
]

const Route = () => {
  const [menu] = SimpleMenu.useMenuInstance()
  console.log(menu)
  return (
    <div style={{ width: 200 }}>
      <button onClick={() => menu.expandAll()} >全部展开</button>
      <button onClick={() => menu.removeExpandAll()} >全部隐藏</button>
      <SimpleMenu
        // size="middle"
        // isHover
        menu={menu}
        isExpand
        items={menus}
      />
    </div>
  );
};
export default Route;
