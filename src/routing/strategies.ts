export default function (models: any) {
  return (req: Request, res: Response, next: Function) => {
    const CompanyRouteStrategy = {
      dashboard: require('./company/dashboard')(models),
      profile: require('./company/profile')(models),
      room: require('./company/room')(models),
      support: require('./company/support')(models)
    };

    const StudentRouteStrategy = {
      dashboard: require('./student/dashboard')(models),
      profile: require('./student/profile')(models),
      room: require('./student/room')(models),
      support: require('./student/support')(models)
    };

    // if (!req.user) {
    //   return next();
    // }

    // req.routeStrategy = req.user.isCompany ? CompanyRouteStrategy :
    //   StudentRouteStrategy;
    next();
    return;
  };
};