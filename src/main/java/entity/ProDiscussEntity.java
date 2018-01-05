package entity;

import java.io.File;
import java.util.Date;

/**
 * Created by DELL on 2017/12/25.
 *
 * @author MJY
 */
public class ProDiscussEntity {
    private int id_pro_discuss;
    private int id_user;
    private String name;
    private int id_catalog;
    private  Date time;
    private String content;
    private String accessory;
    private int id_Project;
    private int id_Document;
    private File MyFile;
    private String MyFileFileName;

    public int getId_pro_discuss() {
        return id_pro_discuss;
    }

    public void setId_pro_discuss(int id_pro_discuss) {
        this.id_pro_discuss = id_pro_discuss;
    }

    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public int getId_catalog() {
        return id_catalog;
    }

    public void setId_catalog(int id_catalog) {
        this.id_catalog = id_catalog;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAccessory() {
        return accessory;
    }

    public void setAccessory(String accessory) {
        this.accessory = accessory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId_Project() {
        return id_Project;
    }

    public void setId_Project(int id_Project) {
        this.id_Project = id_Project;
    }

    public int getId_Document() {
        return id_Document;
    }

    public void setId_Document(int id_Document) {
        this.id_Document = id_Document;
    }

    public File getMyFile() {
        return MyFile;
    }

    public void setMyFile(File myFile) {
        MyFile = myFile;
    }

    public String getMyFileFileName() {
        return MyFileFileName;
    }

    public void setMyFileFileName(String myFileFileName) {
        MyFileFileName = myFileFileName;
    }

    public ProDiscussEntity() {
    }

    public ProDiscussEntity(int id_pro_discuss, int id_user, String name, int id_catalog, Date time, String content, String accessory, int id_Project, int id_Document, File myFile, String myFileFileName) {
        this.id_pro_discuss = id_pro_discuss;
        this.id_user = id_user;
        this.name = name;
        this.id_catalog = id_catalog;
        this.time = time;
        this.content = content;
        this.accessory = accessory;
        this.id_Project = id_Project;
        this.id_Document = id_Document;
        MyFile = myFile;
        MyFileFileName = myFileFileName;
    }

    @Override
    public String toString() {
        return "ProDiscussEntity{" +
                "id_pro_discuss=" + id_pro_discuss +
                ", id_user=" + id_user +
                ", id_catalog=" + id_catalog +
                ", time=" + time +
                ", content='" + content + '\'' +
                ", accessory='" + accessory + '\'' +
                '}';
    }
}
