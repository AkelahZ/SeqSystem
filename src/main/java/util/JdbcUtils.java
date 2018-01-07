package util;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import com.mchange.v2.c3p0.ComboPooledDataSource;

/**
 * JDBC��װ�����Ĺ�����
 * @author Administrator
 *
 */
public class JdbcUtils {
	
	private static DataSource datasource=null;
	static{
		datasource=new ComboPooledDataSource("mvcapp");
	}
	/**
	 * �ͷ�Connection����
	 * @param conn
	 */
	public static void releaseConnection(Connection conn){
		try{
			if(conn!= null){
				conn.close();
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	public static Connection getConnection() throws SQLException{
		return datasource.getConnection();
		
	}
	
}
