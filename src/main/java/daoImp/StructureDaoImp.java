package daoImp;
import dao.DAO;
import dao.StructureDao;
import entity.StructureEntity;
import java.util.List;
public class StructureDaoImp extends DAO<StructureEntity> implements StructureDao{
    public StructureEntity getOne(String name)
    {
        String sql="select * from structure where name=?";
        StructureEntity structure1=get(sql,name);
        return structure1;
    }

    public List<StructureEntity> getAll(int id_user)
    {
        String sql="select * from LIB_COLLECT where ID_USER=? ";
        List<StructureEntity> structure1=getForList(sql,id_user);
        return structure1;
    }
}
