import java.awt.Graphics;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.geom.Line2D;

import javax.swing.JPanel;

public class DrawPanel extends JPanel implements MouseMotionListener, MouseListener{
	
	private Line mouvementSouris;
	
	public DrawPanel()
	{
		super();
		this.addMouseListener(this);
		this.addMouseMotionListener(this);
		this.mouvementSouris = new Line();
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		Graphics g = this.getGraphics();
		super.paint(g);
		this.mouvementSouris = new Line();
		this.mouvementSouris.setStartPoint(e.getPoint());
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		Graphics g = this.getGraphics();
		g.drawLine((int)this.mouvementSouris.getLastPoint().getX(), (int)this.mouvementSouris.getLastPoint().getY(), (int)e.getPoint().getX(), (int)e.getPoint().getY());
		
		this.mouvementSouris.setEndPoint(e.getPoint());
		this.mouvementSouris.calculFinalAngle();
		
		//calculChoix
		
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		Graphics g = this.getGraphics();
		g.drawLine((int)this.mouvementSouris.getLastPoint().getX(), (int)this.mouvementSouris.getLastPoint().getY(), (int)e.getPoint().getX(), (int)e.getPoint().getY());
		
		if(this.mouvementSouris.getMediumPoint().size()>=0 && this.mouvementSouris.getMediumPoint().size()<5)
		{
			this.mouvementSouris.calculFirstCurrentAngle(e.getPoint());
		}
		else if(this.mouvementSouris.getMediumPoint().size()%5 == 0)
		{
			this.mouvementSouris.calculNextCurrentAngle(e.getPoint());
		}
		this.mouvementSouris.addMediumPoint(e.getPoint());
	}
	@Override
	public void mouseMoved(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
	
	

}
