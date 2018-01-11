package daoImp;

import dao.DAO;
import dao.LibraryDao;
import entity.LibraryEntity;
import java.util.List;

public class LibraryDaoImp extends DAO<LibraryEntity> implements LibraryDao{

    public LibraryEntity getOne(int id_library)
    {
        String sql="select * from LIBRARY where ID_LIBRARY=?";
        LibraryEntity library1=get(sql,id_library);
        return library1;
    }
    public List<LibraryEntity> getAll(int id_user,int num1,int num2)
    {
        String sql="select * from VIEW_LIB_COLLECT_JOIN_LIBRARY where id_user=? limit ?,? ";
        List<LibraryEntity> library1=getForList(sql,id_user,num1,num2);
        return library1;
    }

    public List<LibraryEntity> getCommon(int id_user,int num1,int num2)
    {
        String sql="select * from VIEW_LIB_COLLECT_JOIN_LIBRARY where id_user=? and id_template=1 limit ?,? ";
        List<LibraryEntity> library1=getForList(sql,id_user,num1,num2);
        return library1;
    }

    public List<LibraryEntity> getUser(int id_user,int num1,int num2)
    {
        String sql="select * from VIEW_LIB_COLLECT_JOIN_LIBRARY where id_user=? and id_template=2 limit ?,? ";
        List<LibraryEntity> library1=getForList(sql,id_user,num1,num2);
        return library1;
    }

    public List<LibraryEntity> getCase(int id_user,int num1,int num2)
    {
        String sql="select * from VIEW_LIB_COLLECT_JOIN_LIBRARY where id_user=? and id_template=3 limit ?,? ";
        List<LibraryEntity> library1=getForList(sql,id_user,num1,num2);
        return library1;
    }

    public List<LibraryEntity> getPicture(int id_user,int num1,int num2)
    {
        String sql="select * from VIEW_LIB_COLLECT_JOIN_LIBRARY where id_user=? and id_template=4 limit ?,? ";
        List<LibraryEntity> library1=getForList(sql,id_user,num1,num2);
        return library1;
    }

    public int getAllcount()
    {
        String sql="select count(*) from LIBRARY";
        int count=Integer.valueOf(getForValue(sql).toString());
        return count;
    }
    public int getCommoncount()
    {
        String sql="select count(*) from LIBRARY where ID_TEMPLATE=1";
        int count=Integer.valueOf(getForValue(sql).toString());
        return count;
    }
    public int getUsercount()
    {
        String sql="select count(*) from LIBRARY where ID_TEMPLATE=2";
        int count=Integer.valueOf(getForValue(sql).toString());
        return count;
    }
    public int getCasecount()
    {
        String sql="select count(*) from LIBRARY where ID_TEMPLATE=3";
        int count=Integer.valueOf(getForValue(sql).toString());
        return count;
    }
    public int getPicturecount()
    {
        String sql="select count(*) from LIBRARY where ID_TEMPLATE=4";
        int count=Integer.valueOf(getForValue(sql).toString());
        return count;
    }


    public List<LibraryEntity> getMycollect(int id_user,int num1,int num2)
    {
        String sql="SELECT LIB_COLLECT.ID_USER,LIBRARY.ID_LIBRARY,LIBRARY.`NAME`,LIBRARY.ID_TEMPLATE,LIBRARY.COLLECT_NUM,LIBRARY.TIME,LIBRARY.MENTION FROM LIB_COLLECT INNER JOIN LIBRARY ON LIB_COLLECT.ID_LIBRARY = LIBRARY.ID_LIBRARY where LIB_COLLECT.ID_USER=? limit ?,?";
        List<LibraryEntity> librarycollect1=getForList(sql,id_user,num1,num2);
        return librarycollect1;
    }
    public int getMycollectcount(int id_user)
    {
        String sql="select count(*) from LIB_COLLECT where ID_USER=?";
        int count=Integer.valueOf(getForValue(sql,id_user).toString());
        return count;
    }

    @Override
    public List<LibraryEntity> getTypeOfLib(int id_user, int id_type) {
        String sql="select * from VIEW_LIB_COLLECT_JOIN_LIBRARY where id_user=? and id_template=?";
        return getForList(sql,id_user,id_type);
    }

}
