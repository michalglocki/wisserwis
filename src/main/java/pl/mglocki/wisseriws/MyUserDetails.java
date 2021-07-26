package pl.mglocki.wisseriws;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MyUserDetails implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	Users user;
	
	public MyUserDetails() {
	}
	
	public MyUserDetails(String userName) {
		this.user = getUserByName(userName);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>(); 
		grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
		
		System.out.println(new SimpleGrantedAuthority(user.getRole().replaceAll("\\s+","")));
		
		return grantedAuthorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getName();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	public Users getUserByName(String name) {
		
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Users.class); //ListedPositions.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		
		Transaction tx = session.beginTransaction();
		
		Query query = session.createQuery("from Users users where users.name like '" + name +"'");
		Users foundUser = (Users) query.getSingleResult();
		
		tx.commit();
		return foundUser; 
	}

}
