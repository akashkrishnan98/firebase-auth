import { Breadcrumbs, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { ROOT_FOLDER } from "../../configs/app-config";
import { IFolder, IFolderPath } from "../../interface/app-interface";
import useStyles from "./Dashboard.Styles";

interface IPathBreadcrumbProps {
  folder?: IFolder;
}
const PathBreadcrumb: React.FC<IPathBreadcrumbProps> = ({ folder }) => {
  const history = useHistory();
  const classes = useStyles();
  let paths: IFolderPath[] =
    folder === ROOT_FOLDER
      ? []
      : [{ name: ROOT_FOLDER.name, id: ROOT_FOLDER.id || "" }];
  if (folder?.path) paths = [...paths, ...folder.path];

  const handlePathClick = (folderPath: IFolderPath, index: number) => {
    if (!folderPath.id) history.push("/");
    else
      history.push({
        pathname: `/folders/${folderPath.id}`,
        state: {
          folder: { ...folder, path: paths.slice(1, index + 1) } as IFolder,
        },
      });
  };
  console.log(paths);
  return (
    <Breadcrumbs className={classes.breadcrumb}>
      {paths.map((path, index) => (
        <Button
          key={`${path.name}-${path.id}`}
          color="primary"
          className={classes.folderButton}
          onClick={() => handlePathClick(path, index)}
        >
          {path.name}
        </Button>
      ))}

      <Button className={classes.folderButton}>{folder?.name}</Button>
    </Breadcrumbs>
  );
};

export default PathBreadcrumb;
